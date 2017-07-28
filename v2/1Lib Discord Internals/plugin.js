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
     * @param {PatchData} data Data object with all information about current that you may need in your patching callback.callback.
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
            /**
             * @interface
             * @name PatchData
             * @property {object} thisObject Original `this` value in current call of patched method.
             * @property {Arguments} methodArguments Original `arguments` object in current call of patched method. Please, never change function signatures, as it may cause a lot of problems in future.
             * @property {cancelPatch} cancelPatch Function with no arguments and no return value that may be called to reverse patching of current method. Calling this function prevents running of this callback on further original method calls.
             * @property {function} originalMethod Reference to the original method that is patched. You can use in if you need some special usage. You should explicitly provide this value and method arguments when you call this function.
             * @property {originalMethodCall} callOriginalMethod This is a shortcut for calling original method using this and arguments from data object.
             * @property {*} returnValue This is a value returned from original function call. This property is avilable only in `after` callback, or in `instead` callback after calling `callOriginalMethod` function
             */
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
         * Look through all modules of internal Discord's Webpack and return first one that match filter predicate.
         * At first this function will look thruogh alreary loaded modules cache. If no one of loaded modules is matched - then this function tries to load all modules and match for them. Loading any module may have unexpected side effects, like changing current locale of moment.js, so in that case there will be a warning the console. If no module matches - function will return null. You sould always take such predicate to match something, gut your code should be ready to recieve null in case if Discord update something in codebase.
         * If module is ES6 module and hafe default property - only default would be considered, otherwise - full module object.
         * @param {modulePredicate} filter Predicate to match module
         * @param {object} [options] Options object.
         * @param {boolean} [options.cacheOnly=false] Set to true if you want to search only the cache for modules.
         * @return {*} First module that matched by filter or null if none is matched.
         */
        const find = (filter, options = {}) => {
            const {cacheOnly = false} = options;
            for (let i in req.c) {
                if (req.c.hasOwnProperty(i)) {
                    let m = req.c[i].exports;
                    if (m && m.__esModule && m.default)
                        m = m.default;
                    if (m && filter(m))
                        return m;
                }
            }
            if (cacheOnly) {
                console.warn('Cannot find loaded module in cache');
                return null;
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
         * Look through all modules of internal Discord's Webpack and return first object that has all of following properties. You should be ready that in any moment, after Discord update, this function may start returning null (if no such object exists any more) or even some different object with the same properties. So you should provide all property names that you use, and often even some extra properties to make sure you'll get exactly what you want.
         * @see Read {@link find} documentation for more details how search works
         * @param {string[]} propNames Array of property names to look for
         * @param {object} [options] Options object to pass to {@link find}.
         * @return {object} First module that matched by propNames or null if none is matched.
         */
        const findByUniqueProperties = (propNames, options) => find(module => propNames.every(prop => module[prop] !== undefined), options);

        /**
         * Look through all modules of internal Discord's Webpack and return first object that has displayName property with following value. This is useful for searching React components by name. Take into account that not all components are exported as modules. Also there might be several components with same names
         * @see Use {@link ReactComponents} as another way to get react components
         * @see Read {@link find} documentation for more details how search works
         * @param {string} displayName Display name property value to look for
         * @param {object} [options] Options object to pass to {@link find}.
         * @return {object} First module that matched by displayName or null if none is matched.
         */
        const findByDisplayName = (displayName, options) => find(module => module.displayName === displayName, options);

        return {find, findByUniqueProperties, findByDisplayName};

    })();


    /**
     * Get React Internal Instance mounted to DOM element
     * @author noodlebox
     * @param {Element} e DOM element to get React Internal Instance from
     * @return {object|null} Returns React Internal Instance mounted to this element if exists
     */
    const getInternalInstance = e => e[Object.keys(e).find(k => k.startsWith("__reactInternalInstance"))];

    /**
     * Get React component instance of closest owner of DOM element matched by filter
     * @deprecated Use {@link Renderer.doOnEachComponent} or BDv2 Reflection instead
     * @author noodlebox
     * @param {Element} e DOM element to start react component searching
     * @param {object} options Filter to match React component by display name. If `include` if provided, `exclude` value is ignored
     * @param {string[]} options.include Array of names no find component.
     * @param {string[]} options.exclude Array of names to ignore.
     * @return {object|null} Closest matched React component instance or null if none is matched
     */
    const getOwnerInstance = (e, options = {}) => {
        const {include, exclude = ["Popout", "Tooltip", "Scroller", "BackgroundFlash"]} = options;
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

        /**
         * Generator for recursive traversal of nested arrays
         * @param {object} parent Parent object witch contains target property (array)
         * @param {string} key Key of the target property (array) in parent object.
         * @return {Iterable<TraverseItem>} Returns iterable of objects with item, parent and key properties. If target property is not array - will be returned iterable with one element - target property itself.
         */
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
                    /**
                     @interface
                     @name TraverseItem
                     @property {*} item Current item
                     @property {object} parent Parent object witch contains current item
                     @property {string} key Key of the current item in the parent object
                     */
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

        /**
         * Generator for recursive traversal of children in react element. Target react element is also included into result set
         * @param {object} parent Parent object witch contains target property (react element)
         * @param {string} key Key of the target property (react element) in parent object.
         * @return {Iterable<TraverseItem>} Returns iterable of objects with item, parent and key properties.
         */
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

        /**
         * Generator for recursive traversal of rendered react component tree. Only component instances are returned.
         * @param {object} [internalInstance] React Internal Instance of tree root. If not provided, default one is used
         * @return {Iterable<Component>} Returns iterable of rendered react component instances.
         */
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

        /**
         * @interface
         * @name Selector
         * @property {Component} type React component class to match target react component element
         * @property {string} tag Tag name to match target react html element
         * @property {boolean|string|RegExp} className Math react element with className prop. <br/> If `true` is provided - match any element that has className prop. <br/> If string is provided - select element by exact match with any of it space separated classes in className prop. <br/> If RegExp is provided - select element in which regexp matches with any of it space separated classes in className prop.
         * @property {boolean|string|RegExp} text Math text nodes. <br/> If `true` is provided - match any text node. <br/> If string is provided - select text nodes by exact match. <br/> If RegExp is provided - select text nodes which is matched by regexp.
         * @property {number} nthChild Match element only if it is nth child of the parent element. Negative values counts children from the end, ex. -1 means last child.
         * @property {number} eq Selects nth match of selector
         * @property {Selector} hasChild Matches current element only if it has direct child that matches selector
         * @property {Selector} hasSuccessor Matches current element only if it has any successor that matches selector
         * @property {Selector} child Selects direct child of current element that matches selector
         * @property {Selector} successor Selects any successor of current element that matches selector
         */

        /**
         * Returns first react element child that matches the selector
         * @param {object} rootParent Parent object witch contains root react element to start search.
         * @param {string} rootKey Key of the root react element to start search in parent object.
         * @param {Selector} selector Selector object to match children
         * @return {TraverseItem} Object with item, parent and key properties of matched react element object or empty object if nothing matches
         */
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

        /**
         * Predicate witch answers should we apply actions in current render call or not
         * @callback FilterPredicate
         * @param {PatchData} data All data about current call of render function
         * @return {boolean} Return true if actions should be allied and false otherwise.
         */

        /**
         * Callback to generate content for render patch action
         * @callback ContentCallback
         * @param {Component} thisObject This object of the patched react component
         * @param {*} item React element, text node or any other object matched by selector
         * @return {*} Return new content that will be used to apply action
         */

        /**
         * Safetly patches render function of react component to introduce some new behaviour
         * @param {Component} component React component class to patch
         * @param {object[]} actions Array of actions that should be done to change behaviour
         * @param {FilterPredicate} [actions.filter] Predicate witch answers should we apply this action in current render call or not. If not provided - apply always
         * @param {Selector} actions.selector A selector to select first match of something in rendered react element tree. Null placeholders can be also matched.
         * @param {string} actions.method Wich method should be used to apply content to selected object. One of: prepend, append, replaceChildren, before, after, replace
         * @param {ContentCallback|*} actions.content New content that will be used to apply action or callback to generate it
         * @param {FilterPredicate} [filter] Predicate witch answers should we apply any actions in current render call or not. If not provided - apply always
         * @return {cancelPatch} Function with no arguments and no return value that should be called to cancel this patch. You should save and run it when your plugin is stopped.
         */
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
            return () => {
                cancel();
                doOnEachComponent(component, c => c.forceUpdate());
            };
        };


        const planedActions = new Map();
        let planedPromise, planedPromiseResolver;
        const runPlannedActions = () => {
            for (let component of recursiveComponents()) {
                const actions = planedActions.get(component.constructor) || planedActions.get(component.constructor.displayName);
                if (actions) {
                    for (let action of actions) {
                        action(component);
                    }
                }
            }
            planedPromiseResolver();
            planedActions.clear();
            planedPromise = null;
            planedPromiseResolver = null;
        };

        /**
         * Traverse rendered react tree and do action on each matched component. Components can be matched by display name or by class
         * Actions are not applied immediately but rather they are planed to be done on next asynchronous traversal.
         * @param {Component|string} componentType Display name or component class to match component in tree
         * @param {function(Component)} action Action that will be applied to each matched component. Component instance is provided as first param.
         * @return {Promise} Promise that is resolved with no data when all actions are applied
         */
        const doOnEachComponent = (componentType, action) => {
            if (planedActions.size === 0) {
                setImmediate(runPlannedActions);
                planedPromise = new Promise(resolve => planedPromiseResolver = resolve);
            }
            if (!planedActions.has(componentType))
                planedActions.set(componentType, []);
            planedActions.get(componentType).push(action);
            return planedPromise;
        };

        /**
         * Use this method ro rebind all non react lifecycle methods that you are patched. Discord binds all those methods on component creation, so patching prototype isn't enough.
         * This method creates a patch to rebind methods on each component creation (mounting)
         * @param {Component} component Component class to rebind methods
         * @param {string[]} methods Array of methods name to rebind
         * @return {cancelPatch} Function with no arguments and no return value that should be called to cancel this patch. You should save and run it when your plugin is stopped.
         */
        const rebindMethods = (component, methods) => {
            const rebind = function(thisObject) {
                for (let method of methods) {
                    thisObject[method] = component.prototype[method].bind(thisObject)
                }
                thisObject.forceUpdate();
            };
            doOnEachComponent(component, rebind);
            let cancel;
            if (component.prototype.componentWillMount)
                cancel = monkeyPatch(component.prototype, 'componentWillMount', {
                    silent: true,
                    after: ({thisObject}) => {
                        rebind(thisObject);
                    }
                });
            else {
                component.prototype.componentWillMount = function() {
                    rebind(this);
                };
                cancel = () => delete component.prototype.componentWillMount;
            }
            return () => {
                cancel();
                doOnEachComponent(component, rebind);
            };
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

        /**
         * Get React component by displayName as soon as it will be rendered. Be careful, there may be several different components with same name.
         * If component is already rendered, callback is called immediately.
         * @param {string} name Display name of component
         * @param {function} [callback] Callback that will be called before rendering of component or immediately if component is already rendered
         * @return {Promise} Promise object that resolves when component is rendered. Unlike callback promise always resolves asynchronously, so you can't catch moment before rendering.
         */
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

        /**
         * Get all React components by displayName as soon as all of will be rendered at least once. Be careful, there may be several different components with same name.
         * @param {string} names Variadic list of components display names
         * @return {Promise} Promise object that resolves when all components will be rendered at least once.
         */
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

    /**
     * Lexicographical version parts comparator.
     * @param {string} a Version number string consist of integer numbers and dot separators
     * @param {string} b Version number string consist of integer numbers and dot separators
     * @return {number} Returns 0 if versions are the same. Returns value less then zero if version a is earlier than version b and returns value greater than zero otherwise
     */
    const versionCompare = (a, b) => {
        if (a === b) return 0;
        a = a.split('.');
        b = b.split('.');
        const n = Math.min(a.length, b.length);
        let result = 0;
        for (let i = 0; !result && i < n; ++i)
            result = a[i] - b[i];
        if (!result)
            result = a.length - b.length;
        return result;
    };

    window.DiscordInternals = {
        monkeyPatch,
        WebpackModules,
        ReactComponents,
        Renderer,
        getInternalInstance,
        getOwnerInstance,
        versionCompare,
        React
    };


    class LibPlugin extends Plugin {
        constructor(props) {
            super(props);
            window.DiscordInternals.version = props.version;
        }

        onStart() {
            return false;
        }

        onStop() {
            return true;
        }
    }

    return LibPlugin;
};