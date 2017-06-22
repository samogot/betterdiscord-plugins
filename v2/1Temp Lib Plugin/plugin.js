module.exports = (Plugin) => {

    /**
     * Function with no arguments and no return value that may be called to reverse changes that is done by {@link monkeyPatch} method, restoring (unpatching) original method.
     * @callback cancelPatch
     */

    /**
     * This is a shortcut for calling original method using this and arguments from data object. This is a function without input arguments. This function is defined as `() => data.returnValue = data.originalMethod.apply(data.thisObject, data.methodArguments)`
     * @callback originalMethodCall
     * @return {*} The same value, which is returned from original method, also this value would be written into `data.returnValue`
     */

    /**
     * A callback that modifies method logic. Callback is called on each call of original method and have all data about original call. Any of the data can be modified if you need, but do it wisely.
     * @callback doPatchCallback
     * @param {object} data Data object with all information about current that you may need in your patching callback.callback.
     * @param {object} data.thisObject Original `this` value in current call of patched method.
     * @param {Arguments} data.methodArguments Original `arguments` object in current call of patched method. Please, never change function signatures, as it may cause a lot of problems in future.
     * @param {cancelPatch} data.cancelPatch Function with no arguments and no return value that may be called to reverse patching of current method. Calling this function prevents running of this callback on further original method calls.
     * @param {function} data.originalMethod Reference to the original method that is patched. You can use in if you need some special usage. You should explicitly provide this value and method arguments when you call this function.
     * @param {originalMethodCall} data.callOriginalMethod This is a shortcut for calling original method using this and arguments from data object.
     * @param {*} data.returnValue This is a value returned from original function call. This property is avilable only in `after` callback, or in `instead` callback after calling `callOriginalMethod` function
     * @return {*} Makes sense only when used as `instead` parameter in {@link monkeyPatch}. If returned something other then undefined - it replaces value in `returnValue` param. If used as `before` or `after` parameters - return value if ignored.
     */

    /**
     * This is function for monkey-patching any object method. Can make patch before, after or instead of target method.
     * Be careful when monkey-patching. Think not only about original functionality of target method and you changes, but also about develovers of other plugins, who may also patch this method before or after you. Try to change target method behaviour little as you can, and try to never change method signatures.
     * By default this function makes log messages about each patching and unpatching, so you and other developers can see what methods a patched. This messages may be suppressed.
     * Display name of patched method is changed, so you can see if function is patched and how many times while debuging or in the stack trace. Also patched function have property `__monkeyPatched` is set to true, in case you want to check something programmatically.
     *
     * @param {object} what Object to be patched. You can can also pass class prototypes to patch all class instances. If you are patching prototype of react component you may also need {@link Renderer.rebindMethods}.
     * @param {string} methodName The name of the target message to be patched.
     * @param {object} options Options object. You should provide at least one of `before`, `after` or `instead` parameters. Other parameters are optional.
     * @param {doPatchCallback} options.before Callback that will be called before original target method call. You can modify arguments here, so it will be passed to original method. Can be combined with `after`.
     * @param {doPatchCallback} options.after Callback that will be called after original target method call. You can modify return value here, so it will be passed to external code which calls target method. Can be combined with `before`.
     * @param {doPatchCallback} options.instead Callback that will be called instead of original target method call. You can get access to original method using `originalMethod` parameter if you want to call it, but you do not have to. Can't be combined with `before` and `after`.
     * @param {boolean} [options.once=false] Set to true if you want automatically unpatch method after first call.
     * @param {boolean} [options.silent=false] Set to true if you want to suppress log messages about patching and unpatching. Useful to avoid clogging the console in case of frequent conditional patching/unpatching, for example from another monkeyPatch callback.
     * @param {boolean} [options.displayName] You can provide meaningful name of class/object provided in `what` param for logging purposes. By default there will be a try to determine name automatically.
     * @return {cancelPatch} Function with no arguments and no return value that should be called to cancel (unpatch) this patch. You should save and run it when your plugin is stopped.
     */
    const monkeyPatch = (what, methodName, options) => {
        const {before, after, instead, once = false, silent = false} = options;
        const displayName = options.displayName || what.displayName || what.name || what.constructor.displayName || what.constructor.name;
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

		/**
		 * Predicate for searching module
		 * @callback modulePredicate
		 * @param {*} module Module to test
		 * @return {boolean} Thue if it is module that you need
		 */
		
		/**
		 * Look thruogh all modules of internal Discord's Webpack and return first one that match filter predicate. 
		 * At first this function will look thruogh alreary loaded modules cache. If no one of loaded modules is matched - then this function tries to load all modules and match for them. Loading any module may have unexpected side effects, like changin current locale of moment.js, so in that case there will be a warning the console. If no module matches - function will return null. You sould allways take such predicate to match something, gut your code should be ready to recieve null in case if Discord update something in codebase.
		 * @param {modulePredicate} filter Predicate to match module
		 * @return {*} First module that matched by filter or null if none is matched.
		 */
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
            console.warn('Cannot find module');
            return null;
        };
		
		/**
		 * Look thruogh all modules of internal Discord's Webpack and return first object that has all of folowing properties. You should be ready that in any moment, after Discord update, this function may start returning null (if no such object exists eny more) or even some different object with the same properties. So you should provide all property names that you use, and often even some extra properties to make sure you'll get exactly you want.
		 * @see {@link find} for moge details how search works
		 * @param {string[]} propNames Array of property names to look for
		 * @return {object} First module that matched by propNames or null if none is matched.
		 */
        const findByUniqueProperties = (propNames) => find(module => propNames.every(prop => module[prop] !== undefined));
        
		/**
		 * Look thruogh all modules of internal Discord's Webpack and return first object that has displayName property with folowing value. This is usefull for searching React components by name. Take into account that not all components are exported as modules. Also there might be several components with same names
		 * @see {@link find} for moge details how search works
		 * @param {string} displayName Display name property value to look for
		 * @return {object} First module that matched by displayName or null if none is matched.
		 */
		const findByDisplayName = (displayName) => find(module => module.displayName === displayName);

        return {find, findByUniqueProperties, findByDisplayName};

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
                if (match && selector.className) {
                    match = item && item.props && typeof item.props.className === 'string';
                    if (match) {
                        const classes = item.props.className.split(' ');
                        if (selector.className === true)
                            match = !!classes[0];
                        else if (typeof selector.className === 'string')
                            match = classes.includes(selector.className);
                        else if (selector.className instanceof RegExp)
                            match = !!classes.find(cls => selector.className.test(cls));
                        else match = false;
                    }
                }
                if (match && selector.text) {
                    if (selector.text === true)
                        match = typeof item === 'string';
                    else if (typeof selector.text === 'string')
                        match = item === selector.text;
                    else if (selector.text instanceof RegExp)
                        match = typeof item === 'string' && selector.text.test(item);
                    else match = false;
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