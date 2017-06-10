//META{"name":"p_1temp_lib_plugin"}*//
var p_1temp_lib_plugin =
    /******/ (function(modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};

    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {

        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId])
        /******/            return installedModules[moduleId].exports;

        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            exports: {},
            /******/            id: moduleId,
            /******/            loaded: false
            /******/
        };

        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        /******/ 		// Flag the module as loaded
        /******/
        module.loaded = true;

        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }


    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;

    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;

    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "";

    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(0);
    /******/
})
/************************************************************************/
/******/([
    /* 0 */
    /***/ (function(module, exports, __webpack_require__) {

        module.exports = __webpack_require__(1);


        /***/
    }),
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {

        const config = __webpack_require__(2);
        const Plugin = __webpack_require__(3);
        const PluginApi = __webpack_require__(4);
        const PluginStorage = __webpack_require__(16);
        const Vendor = __webpack_require__(9);


        PluginStorage.prototype.load = function() {
            this.settings = JSON.parse(JSON.stringify(this.defaultConfig));
        };
        PluginStorage.prototype.save = () => {
        };

        const storage = new PluginStorage('', config.defaultSettings);
        const BD = {
            Api: new PluginApi(config.info),
            Storage: storage,
            Events: {},
            Renderer: {}
        };

        const plugin = __webpack_require__(17)(Plugin, BD, Vendor);
        const pluginInstance = new plugin(config.info);

        pluginInstance.internal = {
            storage,
            path: ''
        };


        module.exports = class {
            start() {
                pluginInstance.onStart();
            }

            stop() {
                pluginInstance.onStop();
            }

            getName() {
                return pluginInstance.name
            }

            getDescription() {
                return pluginInstance.description
            }

            getVersion() {
                return pluginInstance.version
            }

            getAuthor() {
                return pluginInstance.authors.join(', ')
            }

            getSettingsPanel() {
                return "";
            }
        };

        /***/
    }),
    /* 2 */
    /***/ (function(module, exports) {

        module.exports = {
            "info": {
                "name": "Temp Lib Plugin",
                "authors": [
                    "Samogot"
                ],
                "version": "1.0",
                "description": "Temporary add Discord Internals lib",
                "repository": "https://github.com/samogot/BetterDiscordApp.git",
                "homepage": "https://github.com/samogot/BetterDiscordApp",
                "reloadable": true
            },
            "defaultSettings": [],
            "permissions": []
        };

        /***/
    }),
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
                let setting = this.storage.settings.find(setting => {
                    return setting.id === id;
                });
                if (setting && setting.value !== undefined) return setting.value;
            }

            get enabled() {
                return this.getSetting("enabled");
            }
        }

        module.exports = Plugin;

        /***/
    }),
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

        /***/
    }),
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
                if (!force) {
                    if (!window.BetterDiscord || !window.BetterDiscord.debug) return;
                }
                this.log(moduleName, message, 'debug', true);
            }

            static debugObject(moduleName, message, object, level, force) {
                if (!force) {
                    if (!window.BetterDiscord || !window.BetterDiscord.debug) return;
                }

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

        /***/
    }),
    /* 6 */
    /***/ (function(module, exports, __webpack_require__) {

        /**
         * BetterDiscord Api Module
         * Copyright (c) 2015-present Jiiks - https://jiiks.net
         * All rights reserved.
         * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */
        'use strict';

        const {Message, Channel, User, Guild, Role} = __webpack_require__(7);
        const DeepReflection = __webpack_require__(7);
        const Settings = __webpack_require__(7);
        const Dom = __webpack_require__(8);
        const {$} = __webpack_require__(9);

        class Api {
            static get bdVersion() {
                return Settings.version;
            }

            static get jsVersion() {
                return Settings.jsversion;
            }

            static get Reflection() {
                return DeepReflection;
            }

            static get currentGuild() {
                const guild = new Guild(DeepReflection.scan(".title-wrap", "guild"));
                return guild.null ? null : guild;
            }

            static get currentChannel() {
                const channel = new Channel(DeepReflection.scan(".title-wrap", "channel"));
                return channel.null ? null : channel;
            }

            static injectTheme(id, css) {
                Dom.themeContainer.append($("<style/>", {
                    'data-bd': id,
                    'text': css
                }));
            }

            static removeTheme(id) {
                Dom.themeContainer.find(`[data-bd='${id}']`).remove();
            }

            static injectStyle(id, css) {
                Dom.styleContainer.append($("<style/>", {
                    'data-bd': id,
                    'text': css
                }));
            }

            static removeStyle(id) {
                Dom.styleContainer.find(`[data-bd='${id}']`).remove();
            }

            static injectScript(id, script) {
                Dom.scriptContainer.append($("<script/>", {
                    'data-bd': id,
                    'text': script
                }));
            }

            static removeScript(id) {
                Dom.scriptContainer.find(`[data-bd='${id}']`).remove();
            }
        }

        module.exports = Api;

        /***/
    }),
    /* 7 */
    /***/ (function(module, exports) {

        module.exports = {};

        /***/
    }),
    /* 8 */
    /***/ (function(module, exports, __webpack_require__) {

        /**
         * BetterDiscord Dom Module
         * Copyright (c) 2015-present Jiiks - https://jiiks.net
         * All rights reserved.
         * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */
        'use strict';

        /* Used for storing common nodes and manipulating the dom */
        const {$} = __webpack_require__(9);

        class Dom {
            injectContainers() {
                if (this.containers) return;

                this.containers = {
                    head: $("<bd-head/>"),
                    body: $("<bd-body/>"),
                    themeContainer: $("<bd-themes/>"),
                    modalContainer: $("<div/>", {'data-bd': 'modal-container'})
                };

                this.containers.head.appendTo($("head"));
                this.containers.themeContainer.appendTo(this.containers.head);
                this.containers.body.appendTo($("body"));
                this.containers.modalContainer.appendTo(this.containers.body);
            }

            get head() {
                return this.containers.head;
            }

            get styleContainer() {
                return this.head;
            }

            get body() {
                return this.containers.body;
            }

            get scriptContainer() {
                return this.body;
            }

            get modalContainer() {
                return this.containers.modalContainer;
            }

            get themeContainer() {
                return this.containers.themeContainer;
            }
        }

        module.exports = new Dom();

        /***/
    }),
    /* 9 */
    /***/ (function(module, exports, __webpack_require__) {

        /**
         * BetterDiscord Vendor Exports
         * Exports jQuery to be used in other classes
         * Copyright (c) 2015-present Jiiks - https://jiiks.net
         * All rights reserved.
         * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        const jquery = __webpack_require__(10);
        const moment = __webpack_require__(11);
        const react = __webpack_require__(12);
        const reactdom = __webpack_require__(14);

        module.exports = {
            jQuery: jquery,
            $: jquery,
            moment: moment,
            React: react,
            ReactDOM: reactdom
        }


        /***/
    }),
    /* 10 */
    /***/ (function(module, exports) {

        module.exports = jQuery;

        /***/
    }),
    /* 11 */
    /***/ (function(module, exports) {

        /**
         * BetterDiscord jQuery vendor
         * Exports jQuery to be used in other classes
         * Copyright (c) 2015-present Jiiks - https://jiiks.net
         * All rights reserved.
         * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        'use strict';

        const momentInstance = window._bd.moment;

        module.exports = momentInstance;

        /***/
    }),
    /* 12 */
    /***/ (function(module, exports, __webpack_require__) {

        /**
         * BetterDiscord React vendor
         * Exports React to be used in other classes
         * Copyright (c) 2015-present Jiiks - https://jiiks.net
         * All rights reserved.
         * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        'use strict';

        const ReactInstance = __webpack_require__(13);

        module.exports = ReactInstance;

        /***/
    }),
    /* 13 */
    /***/ (function(module, exports) {

        module.exports = BDV2.react;

        /***/
    }),
    /* 14 */
    /***/ (function(module, exports, __webpack_require__) {

        /**
         * BetterDiscord react-dom vendor
         * Exports react-dom to be used in other classes
         * Copyright (c) 2015-present Jiiks - https://jiiks.net
         * All rights reserved.
         * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
         *
         * This source code is licensed under the MIT license found in the
         * LICENSE file in the root directory of this source tree.
         */

        'use strict';

        const ReactDOMInstance = __webpack_require__(15);

        module.exports = ReactDOMInstance;

        /***/
    }),
    /* 15 */
    /***/ (function(module, exports) {

        module.exports = BDV2.reactDom;

        /***/
    }),
    /* 16 */
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

        const Utils = __webpack_require__(7);

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
                const reduced = this.settings.reduce((result, item) => {
                    result[item.id] = item.value;
                    return result;
                }, {});
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
                    this.settings.push({id, value});
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

        /***/
    }),
    /* 17 */
    /***/ (function(module, exports) {

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

                const modulesFactories = webpackJsonp([], {
                    '__extra_id__': (module, exports, req) => {
                        exports.default = Object.values(req).find(f => f instanceof Array);
                    }
                }, ['__extra_id__']).default;
                delete modulesFactories['__extra_id__'];

                const find = (filter) => {
                    for (let i = 0; i < modulesFactories.length; ++i) {
                        let m = webpackJsonp([], [], [i]);
                        if (m && m.__esModule && m.default)
                            m = m.default;
                        if (m && filter(m))
                            return m;
                    }
                    return null;
                };
                const findByUniqueProperties = (propNames) => find(module => propNames.every(prop => module[prop] != undefined))
                const findByDisplayName = (displayName) => find(module => module.displayName === displayName)

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

            window.DiscordInternals = {
                monkeyPatch,
                WebpackModules,
                ReactComponents,
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

        /***/
    })
    /******/]);