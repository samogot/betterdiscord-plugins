//META{"name":"p_full_offline_list"}*//
var p_full_offline_list =
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

	module.exports = __webpack_require__(12);


/***/ }),
/* 1 */,
/* 2 */,
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	const v1transpile_version = 1;

	module.exports = class {
	    constructor() {
	        const config = __webpack_require__(13);
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

	        const plugin = __webpack_require__(14)(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
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
/* 13 */
/***/ (function(module, exports) {

	module.exports = {
		"info": {
			"name": "Full offline list",
			"authors": [
				"Samogot"
			],
			"version": "1.1",
			"description": "Show full offline list even in large servers",
			"repository": "https://github.com/samogot/betterdiscord-plugins.git",
			"homepage": "https://github.com/samogot/betterdiscord-plugins/tree/master/v2/Full%20offline%20list",
			"reloadable": true
		},
		"defaultSettings": [],
		"permissions": []
	};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	module.exports = (Plugin) => {

	    class V2Plugin extends Plugin {

	        onStart() {
	            const {monkeyPatch, WebpackModules} = window.DiscordInternals;

	            const GuildsStore = WebpackModules.findByUniqueProperties(['getGuild']);
	            const GuildMembersStore = WebpackModules.findByUniqueProperties(['getMemberGroups']);


	            this.cancelGlobalPatch = monkeyPatch(GuildMembersStore, 'getMemberGroups', {
	                instead: ({callOriginalMethod}) => {
	                    let guild, largeRealValue;
	                    const cancelLocalPatch = monkeyPatch(GuildsStore, 'getGuild', {
	                        silent: true,
	                        after: ({returnValue}) => {
	                            if (returnValue) {
	                                guild = returnValue;
	                                largeRealValue = guild.large;
	                                guild.large = false;
	                            }
	                        }
	                    });
	                    callOriginalMethod();
	                    cancelLocalPatch();
	                    if (guild) {
	                        guild.large = largeRealValue;
	                    }
	                }
	            });

	            return true;
	        }

	        onStop() {
	            this.cancelGlobalPatch();
	            return true;
	        }

	    }

	    return V2Plugin;
	};

/***/ })
/******/ ]);