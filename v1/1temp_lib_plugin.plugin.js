//META{"name":"p_1temp_lib_plugin"}*//
var p_1temp_lib_plugin =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const v1transpile_version = 1;

	module.exports = class {
	    constructor() {
	        const config = __webpack_require__(2);
	        if (!window.v1transpile || window.v1transpile.version < v1transpile_version) {
	            window.v1transpile = window.v1transpile || {};
	            window.v1transpile.version = v1transpile_version;
	            window.v1transpile.Plugin = window.v1transpile.Plugin || __webpack_require__(3);
	            window.v1transpile.PluginApi = window.v1transpile.PluginApi || __webpack_require__(4);
	            window.v1transpile.PluginStorage = window.v1transpile.PluginStorage || __webpack_require__(7);

	            window.v1transpile.PluginApi.prototype.injectStyle = (id, css) => BdApi.injectCSS(id, css);
	            window.v1transpile.PluginApi.prototype.removeStyle = (id) => BdApi.clearCSS(id);

	            window.v1transpile.PluginStorage.prototype.load = function() {
	                this.settings = JSON.parse(JSON.stringify(this.defaultConfig));
	            };
	            window.v1transpile.PluginStorage.prototype.save = () => {
	            };

	            window.v1transpile.Vendor = window.v1transpile.Vendor || {
	                get jQuery() {
	                    return window.jQuery;
	                },
	                get $() {
	                    return window.jQuery;
	                },
	                get React() {
	                    return window.BDV2.react;
	                },
	                get ReactDOM() {
	                    return window.BDV2.reactDom;
	                },
	                moment: {}
	            };
	        }

	        const storage = new window.v1transpile.PluginStorage('', config.defaultSettings);
	        const BD = {
	            Api: new window.v1transpile.PluginApi(config.info),
	            Storage: storage,
	            Events: {},
	            Renderer: {}
	        };

	        const plugin = __webpack_require__(8)(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
	        this.pluginInstance = new plugin(config.info);

	        this.pluginInstance.internal = {
	            storage,
	            path: ''
	        };
	    }

	    start() {
	        this.pluginInstance.onStart();
	    }

	    stop() {
	        this.pluginInstance.onStop();
	    }

	    load() {
	    }

	    unload() {
	    }

	    getName() {
	        return this.pluginInstance.name
	    }

	    getDescription() {
	        return this.pluginInstance.description
	    }

	    getVersion() {
	        return this.pluginInstance.version
	    }

	    getAuthor() {
	        return this.pluginInstance.authors.join(', ')
	    }

	    getSettingsPanel() {
	        return "";
	    }
	};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = {
		"info": {
			"name": "Temp Lib Plugin",
			"authors": [
				"Samogot"
			],
			"version": "1.1",
			"description": "Temporary add Discord Internals lib",
			"repository": "https://github.com/samogot/betterdiscord-plugins.git",
			"homepage": "https://github.com/samogot/betterdiscord-plugins/tree/master/v2/1Temp%20Lib%20Plugin",
			"reloadable": true
		},
		"defaultSettings": [],
		"permissions": []
	};

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	/**
	 * BetterDiscord Plugin Base Class
	 * Copyright (c) 2015-present Jiiks - https://jiiks.net
	 * All rights reserved.
	 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree. 
	*/
	'use strict';

	class Plugin {
	    constructor(props) {
	        this.props = props;
	    }

	    get authors() {
	        return this.props.authors;
	    }

	    get version() {
	        return this.props.version;
	    }

	    get name() {
	        return this.props.name;
	    }

	    get description() {
	        return this.props.description;
	    }

	    get reloadable() {
	        return this.props.reloadable;
	    }

	    get permissions() {
	        return this.props.permissions;
	    }

	    get storage() {
	        return this.internal.storage;
	    }

	    get settings() {
	        return this.storage.settings;
	    }

	    saveSettings() {
	        this.storage.save();
	        this.onSave(this.settings);
	    }

	    getSetting(id) {
	        let setting = this.storage.settings.find(setting => { return setting.id === id; });
	        if (setting && setting.value !== undefined) return setting.value;
	    }

	    get enabled() {
	        return this.getSetting("enabled");
	    }
	}

	module.exports = Plugin;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * BetterDiscord Plugin Api
	 * Copyright (c) 2015-present Jiiks - https://jiiks.net
	 * All rights reserved.
	 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	*/
	'use strict';

	const Logger = __webpack_require__(5);
	const Api = __webpack_require__(6);

	class PluginApi {
	    constructor(props) {
	        this.props = props;
	    }

	    log(message, level) {
	        Logger.log(this.props.name, message, level);
	    }

	    injectStyle(id, css) {
	        Api.injectStyle(id, css);
	    }

	    removeStyle(id) {
	        Api.removeStyle(id);
	    }

	    injectScript(id, script) {
	        Api.injectScript(id, script);
	    }

	    removeScript(id) {
	        Api.removeScript(id);
	    }
	}

	module.exports = PluginApi;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/**
	 * BetterDiscord Logger Module
	 * Copyright (c) 2015-present Jiiks - https://jiiks.net
	 * All rights reserved.
	 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree. 
	*/
	'use strict';

	class Logger {

	    static log(moduleName, message, level = 'log') {
	        level = this.parseLevel(level);
	        console[level]('[%cBetter%cDiscord:%s] %s', 'color: #3E82E5', '', `${moduleName}${level === 'debug' ? '|DBG' : ''}`, message);
	    }

	    static logObject(moduleName, message, object, level) {
	        if (message) this.log(moduleName, message, level);
	        console.log(object);
	    }

	    static debug(moduleName, message, level, force) {
	        if (!force) { if (!window.BetterDiscord || !window.BetterDiscord.debug) return; }
	        this.log(moduleName, message, 'debug', true);
	    }

	    static debugObject(moduleName, message, object, level, force) {
	        if (!force) { if (!window.BetterDiscord || !window.BetterDiscord.debug) return; }

	        if (message) this.debug(moduleName, message, level, force);
	        console.debug(object);
	    }

	    static parseLevel(level) {
	        return {
	            'log': 'log',
	            'warn': 'warn',
	            'err': 'error',
	            'error': 'error',
	            'debug': 'debug',
	            'dbg': 'debug',
	            'info': 'info'
	        }[level];
	    }

	}

	module.exports = Logger;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = {};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * BetterDiscord Plugin Storage
	 * Copyright (c) 2015-present Jiiks - https://jiiks.net
	 * All rights reserved.
	 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	*/
	'use strict';

	const Utils = __webpack_require__(6);

	class PluginStorage {
	    constructor(path, defaults) {
	        this.path = `${path}/settings.json`;
	        this.defaultConfig = defaults;
	        this.load();
	    }

	    load() {
	        this.settings = JSON.parse(JSON.stringify(this.defaultConfig));

	        const loadSettings = Utils.tryParse(Utils.readFileSync(this.path));
	        if (loadSettings) {
	            Object.keys(loadSettings).map(key => {
	                this.setSetting(key, loadSettings[key]);
	            });
	        }

	        if (!this.getSetting('enabled')) this.setSetting('enabled', false);
	    }

	    save() {
	        const reduced = this.settings.reduce((result, item) => { result[item.id] = item.value; return result; }, {});
	        Utils.writeFileSync(this.path, JSON.stringify(reduced));
	    }

	    getSetting(id) {
	        const setting = this.settings.find(setting => setting.id === id);
	        if (!setting) return null;
	        return setting.value;
	    }

	    setSetting(id, value) {
	        const setting = this.settings.find(setting => setting.id === id);
	        if (!setting) {
	            this.settings.push({ id, value });
	        } else {
	            setting.value = value;
	        }
	        this.save();
	    }

	    setSettings(settings) {
	        this.settings = settings;
	    }
	}

	module.exports = PluginStorage;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate) {module.exports = (Plugin) => {

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
	                    listners[name].forEach(f => f(component))
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
	                const actions = planedActions.get(component.constructor);
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

	        return {patchRender, recursiveChildren, recursiveComponents, getFirstChild, doOnEachComponent, rebindMethods};
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9).setImmediate))

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	var apply = Function.prototype.apply;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) {
	  if (timeout) {
	    timeout.close();
	  }
	};

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// setimmediate attaches itself to the global object
	__webpack_require__(10);
	exports.setImmediate = setImmediate;
	exports.clearImmediate = clearImmediate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
	    "use strict";

	    if (global.setImmediate) {
	        return;
	    }

	    var nextHandle = 1; // Spec says greater than zero
	    var tasksByHandle = {};
	    var currentlyRunningATask = false;
	    var doc = global.document;
	    var registerImmediate;

	    function setImmediate(callback) {
	      // Callback can either be a function or a string
	      if (typeof callback !== "function") {
	        callback = new Function("" + callback);
	      }
	      // Copy function arguments
	      var args = new Array(arguments.length - 1);
	      for (var i = 0; i < args.length; i++) {
	          args[i] = arguments[i + 1];
	      }
	      // Store and register the task
	      var task = { callback: callback, args: args };
	      tasksByHandle[nextHandle] = task;
	      registerImmediate(nextHandle);
	      return nextHandle++;
	    }

	    function clearImmediate(handle) {
	        delete tasksByHandle[handle];
	    }

	    function run(task) {
	        var callback = task.callback;
	        var args = task.args;
	        switch (args.length) {
	        case 0:
	            callback();
	            break;
	        case 1:
	            callback(args[0]);
	            break;
	        case 2:
	            callback(args[0], args[1]);
	            break;
	        case 3:
	            callback(args[0], args[1], args[2]);
	            break;
	        default:
	            callback.apply(undefined, args);
	            break;
	        }
	    }

	    function runIfPresent(handle) {
	        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
	        // So if we're currently running a task, we'll need to delay this invocation.
	        if (currentlyRunningATask) {
	            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
	            // "too much recursion" error.
	            setTimeout(runIfPresent, 0, handle);
	        } else {
	            var task = tasksByHandle[handle];
	            if (task) {
	                currentlyRunningATask = true;
	                try {
	                    run(task);
	                } finally {
	                    clearImmediate(handle);
	                    currentlyRunningATask = false;
	                }
	            }
	        }
	    }

	    function installNextTickImplementation() {
	        registerImmediate = function(handle) {
	            process.nextTick(function () { runIfPresent(handle); });
	        };
	    }

	    function canUsePostMessage() {
	        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
	        // where `global.postMessage` means something completely different and can't be used for this purpose.
	        if (global.postMessage && !global.importScripts) {
	            var postMessageIsAsynchronous = true;
	            var oldOnMessage = global.onmessage;
	            global.onmessage = function() {
	                postMessageIsAsynchronous = false;
	            };
	            global.postMessage("", "*");
	            global.onmessage = oldOnMessage;
	            return postMessageIsAsynchronous;
	        }
	    }

	    function installPostMessageImplementation() {
	        // Installs an event handler on `global` for the `message` event: see
	        // * https://developer.mozilla.org/en/DOM/window.postMessage
	        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

	        var messagePrefix = "setImmediate$" + Math.random() + "$";
	        var onGlobalMessage = function(event) {
	            if (event.source === global &&
	                typeof event.data === "string" &&
	                event.data.indexOf(messagePrefix) === 0) {
	                runIfPresent(+event.data.slice(messagePrefix.length));
	            }
	        };

	        if (global.addEventListener) {
	            global.addEventListener("message", onGlobalMessage, false);
	        } else {
	            global.attachEvent("onmessage", onGlobalMessage);
	        }

	        registerImmediate = function(handle) {
	            global.postMessage(messagePrefix + handle, "*");
	        };
	    }

	    function installMessageChannelImplementation() {
	        var channel = new MessageChannel();
	        channel.port1.onmessage = function(event) {
	            var handle = event.data;
	            runIfPresent(handle);
	        };

	        registerImmediate = function(handle) {
	            channel.port2.postMessage(handle);
	        };
	    }

	    function installReadyStateChangeImplementation() {
	        var html = doc.documentElement;
	        registerImmediate = function(handle) {
	            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
	            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
	            var script = doc.createElement("script");
	            script.onreadystatechange = function () {
	                runIfPresent(handle);
	                script.onreadystatechange = null;
	                html.removeChild(script);
	                script = null;
	            };
	            html.appendChild(script);
	        };
	    }

	    function installSetTimeoutImplementation() {
	        registerImmediate = function(handle) {
	            setTimeout(runIfPresent, 0, handle);
	        };
	    }

	    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
	    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
	    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

	    // Don't get fooled by e.g. browserify environments.
	    if ({}.toString.call(global.process) === "[object process]") {
	        // For Node.js before 0.9
	        installNextTickImplementation();

	    } else if (canUsePostMessage()) {
	        // For non-IE10 modern browsers
	        installPostMessageImplementation();

	    } else if (global.MessageChannel) {
	        // For web workers, where supported
	        installMessageChannelImplementation();

	    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
	        // For IE 6–8
	        installReadyStateChangeImplementation();

	    } else {
	        // For older browsers
	        installSetTimeoutImplementation();
	    }

	    attachTo.setImmediate = setImmediate;
	    attachTo.clearImmediate = clearImmediate;
	}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(11)))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] }

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ })
/******/ ]);