module.exports = (Plugin) => {

    const monkeyPatch = (what, methodName, {before, after, instead, silent = false, displayName, once = false}) => {
        displayName = displayName || what.displayName || what.name || what.constructor.displayName || what.constructor.name;
        if (!silent) console.log('patch', methodName, 'of', displayName);
        const origMethod = what[methodName];
        const cancel = () => {
            if (!silent) console.log('unpatch', methodName, 'of', displayName);
            what[methodName] = origMethod;
        };
        what[methodName] = function() {
            const data = {
                thisObject: this,
                methodArguments: arguments,
                cancelPatch: cancel,
                originalMethod: origMethod,
                callOriginalMethod: () => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)
            };
            if (instead) {
                const tempRet = instead(data);
                if (tempRet !== undefined)
                    data.returnValue = tempRet;
            }
            else {
                if (before) before(data);
                data.callOriginalMethod();
                if (after) after(data);
            }
            if (once) cancel();
            return data.returnValue;
        };
        what[methodName].__monkeyPatched = true;
        what[methodName].displayName = 'patched ' + (what[methodName].displayName || methodName);
        return cancel;
    };

    const WebpackModules = (() => {

        const req = webpackJsonp([], {
            '__extra_id__': (module, exports, req) => exports.default = req
        }, ['__extra_id__']).default;
        delete req.m['__extra_id__'];
        delete req.c['__extra_id__'];

        const find = (filter) => {
            for (let i in req.c) {
                if (req.c.hasOwnProperty(i)) {
                    let m = req.c[i].exports;
                    if (m && m.__esModule && m.default)
                        m = m.default;
                    if (m && filter(m))
                        return m;
                }
            }
            console.warn('Cannot find loaded module in cache. Loading all modules may have unexpected side effects');
            for (let i = 0; i < req.m.length; ++i) {
                let m = req(i);
                if (m && m.__esModule && m.default)
                    m = m.default;
                if (m && filter(m))
                    return m;
            }
            return null;
        };
        const findByUniqueProperties = (propNames) => find(module => propNames.every(prop => module[prop] !== undefined));
        const findByDisplayName = (displayName) => find(module => module.displayName === displayName);

        return {find, findByUniqueProperties, findByDisplayName};

    })();

    const React = WebpackModules.findByUniqueProperties(['createMixin']);

    const ReactComponents = (() => {

        const components = {};
        const listners = {};
        const put = component => {
            const name = component.displayName;
            if (!components[name]) {
                components[name] = component;
                if (listners[name]) {
                    listners[name].forEach(f => f(component));
                    listners[name] = null;
                }
            }
        };
        const get = (name, callback = null) => new Promise(resolve => {
            const listner = component => {
                if (callback) callback(component);
                resolve(component);
            };
            if (components[name]) {
                listner(components[name]);
            }
            else {
                if (!listners[name]) listners[name] = [];
                listners[name].push(listner);
            }
        });
        const getAll = (...names) => Promise.all(names.map(name => get(name)));

        monkeyPatch(React, 'createElement', {
            displayName: 'React',
            before: ({methodArguments}) => {
                if (methodArguments[0].displayName) {
                    put(methodArguments[0]);
                }
            }
        });
        for (let component of Renderer.recursiveComponents()) {
            if (component.constructor.displayName) {
                put(component.constructor);
            }
        }

        return {get, getAll};

    })();

    const getInternalInstance = e => e[Object.keys(e).find(k => k.startsWith("__reactInternalInstance"))];
    const getOwnerInstance = (e, {include, exclude = ["Popout", "Tooltip", "Scroller", "BackgroundFlash"]} = {}) => {
        if (e === undefined) {
            return undefined;
        }
        const excluding = include === undefined;
        const filter = excluding ? exclude : include;

        function getDisplayName(owner) {
            const type = owner._currentElement.type;
            const constructor = owner._instance && owner._instance.constructor;
            return type.displayName || constructor && constructor.displayName || null;
        }

        function classFilter(owner) {
            const name = getDisplayName(owner);
            return (name !== null && !!(filter.includes(name) ^ excluding));
        }

        for (let prev, curr = getInternalInstance(e); !_.isNil(curr); prev = curr, curr = curr._hostParent) {
            if (prev !== undefined && !_.isNil(curr._renderedChildren)) {
                let owner = Object.values(curr._renderedChildren)
                    .find(v => !_.isNil(v._instance) && v.getHostNode() === prev.getHostNode());
                if (!_.isNil(owner) && classFilter(owner)) {
                    return owner._instance;
                }
            }

            if (_.isNil(curr._currentElement)) {
                continue;
            }
            let owner = curr._currentElement._owner;
            if (!_.isNil(owner) && classFilter(owner)) {
                return owner._instance;
            }
        }

        return null;
    };

    const Renderer = (() => {
        const recursiveArray = (parent, key, count = 1) => {
            let index = 0;

            function* innerCall(parent, key) {
                const item = parent[key];
                if (item instanceof Array) {
                    for (const subKey of item.keys()) {
                        yield* innerCall(item, subKey)
                    }
                }
                else {
                    yield {item, parent, key, index: index++, count};
                }
            }

            return innerCall(parent, key);
        };

        const recursiveArrayCount = (parent, key) => {
            let count = 0;
            for (let {} of recursiveArray(parent, key))
                ++count;
            return recursiveArray(parent, key, count);
        };

        function* recursiveChildren(parent, key, index = 0, count = 1) {
            const item = parent[key];
            yield {item, parent, key, index, count};
            if (item && item.props && item.props.children) {
                for (let {parent, key, index, count} of recursiveArrayCount(item.props, 'children')) {
                    yield* recursiveChildren(parent, key, index, count);
                }
            }
        }

        const reactRootInternalInstance = getInternalInstance(document.getElementById('app-mount').firstElementChild);

        function* recursiveComponents(internalInstance = reactRootInternalInstance) {
            if (internalInstance._instance)
                yield internalInstance._instance;
            if (internalInstance._renderedComponent)
                yield* recursiveComponents(internalInstance._renderedComponent);
            if (internalInstance._renderedChildren)
                for (let child of Object.values(internalInstance._renderedChildren))
                    yield* recursiveComponents(child);
        }

        const returnFirst = (iterator, process) => {
            for (let child of iterator) {
                const retVal = process(child);
                if (retVal !== undefined) {
                    return retVal;
                }
            }
        };

        const getFirstChild = (rootParent, rootKey, selector) => {
            const getDirrectChild = (item, selector) => {
                if (item && item.props && item.props.children) {
                    return returnFirst(recursiveArrayCount(item.props, 'children'), checkFilter.bind(null, selector));
                }
            };
            const checkFilter = (selector, {item, parent, key, count, index}) => {
                let match = true;
                if (match && selector.type)
                    match = item && selector.type === item.type;
                if (match && selector.tag)
                    match = item && typeof item.type === 'string' && selector.tag === item.type;
                if (match && selector.className)
                    match = item && item.props && typeof item.props.className === 'string' && item.props.className.split(' ').includes(selector.className);
                if (match && selector.text) {
                    if (selector.text === true)
                        match = typeof item === 'string';
                    else if (typeof selector.text === 'string')
                        match = item === selector.text;
                    else if (selector.text instanceof RegExp)
                        match = typeof item === 'string' && selector.text.test(item);
                }
                if (match && selector.nthChild)
                    match = index === (selector.nthChild < 0 ? count + selector.nthChild : selector.nthChild);
                if (match && selector.hasChild)
                    match = getDirrectChild(item, selector.hasChild);
                if (match && selector.hasSuccessor)
                    match = item && !!getFirstChild(parent, key, selector.hasSuccessor).item;
                if (match && selector.eq) {
                    --selector.eq;
                    return;
                }
                if (match) {
                    if (selector.child) {
                        return getDirrectChild(item, selector.child);
                    }
                    else if (selector.successor) {
                        return getFirstChild(parent, key, selector.successor);
                    }
                    else {
                        return {item, parent, key};
                    }
                }
            };
            return returnFirst(recursiveChildren(rootParent, rootKey), checkFilter.bind(null, selector)) || {};
        };

        const patchRender = (component, actions, filter) => {
            const cancel = monkeyPatch(component.prototype, 'render', {
                after: (data) => {
                    if (!filter || filter(data)) {
                        for (let action of actions) {
                            if (!action.filter || action.filter(data)) {
                                const {item, parent, key} = getFirstChild(data, 'returnValue', action.selector);
                                if (item) {
                                    const content = typeof action.content === 'function' ? action.content(data.thisObject, item) : action.content;
                                    switch (action.method) {
                                        case 'prepend':
                                            item.props.children = [content, item.props.children];
                                            break;
                                        case 'append':
                                            item.props.children = [item.props.children, content];
                                            break;
                                        case 'replaceChildren':
                                            item.props.children = content;
                                            break;
                                        case 'before':
                                            parent[key] = [content, parent[key]];
                                            break;
                                        case 'after':
                                            parent[key] = [parent[key], content];
                                            break;
                                        case 'replace':
                                            parent[key] = content;
                                            break;
                                        default:
                                            throw new Error('Unexpected method ' + action.method);
                                    }
                                }
                            }
                        }
                    }
                }
            });
            doOnEachComponent(component, c => c.forceUpdate());
            return cancel;
        };


        const planedActions = new Map();
        const runPlannedActions = () => {
            for (let component of recursiveComponents()) {
                const actions = planedActions.get(component.constructor) || planedActions.get(component.constructor.displayName);
                if (actions) {
                    for (let action of actions) {
                        action(component);
                    }
                }
            }
            planedActions.clear();
        };
        const doOnEachComponent = (componentType, action) => {
            if (planedActions.size === 0)
                setImmediate(runPlannedActions);
            if (!planedActions.has(componentType))
                planedActions.set(componentType, []);
            planedActions.get(componentType).push(action);
        };


        const rebindMethods = (component, methods) => {
            const rebind = function(thisObject) {
                for (let method of methods) {
                    thisObject[method] = component.prototype[method].bind(thisObject)
                }
                thisObject.forceUpdate();
            };
            doOnEachComponent(component, rebind);
            if (component.prototype.componentWillMount)
                return monkeyPatch(component.prototype, 'componentWillMount', {
                    silent: true,
                    after: ({thisObject}) => {
                        rebind(thisObject);
                    }
                });
            else {
                component.prototype.componentWillMount = function() {
                    rebind(this);
                };
                return () => delete component.prototype.componentWillMount;
            }
        };

        return {
            patchRender,
            recursiveArray,
            recursiveChildren,
            recursiveComponents,
            getFirstChild,
            doOnEachComponent,
            rebindMethods
        };
    })();

    window.DiscordInternals = {
        monkeyPatch,
        WebpackModules,
        ReactComponents,
        Renderer,
        getInternalInstance,
        getOwnerInstance,
        React
    };


    class LibPlugin extends Plugin {
        onStart() {
            return false;
        }

        onStop() {
            return true;
        }
    }

    return LibPlugin;
};