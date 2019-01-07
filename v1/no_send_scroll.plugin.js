//META{"name":"p_no_send_scroll"}*//

/*@cc_on
@if (@_jscript)
	
	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you tried to run me directly. This is not desired behavior! It will work now, but likely will not work with other plugins. Even worse, with other untrusted plugins it may lead computer virus infection!", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.\nJust reload Discord with Ctrl+R.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!\nJust reload Discord with Ctrl+R.", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else @*/

	var p_no_send_scroll =
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
	
		module.exports = __webpack_require__(15);
	
	
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
	/* 12 */,
	/* 13 */,
	/* 14 */,
	/* 15 */
	/***/ (function(module, exports, __webpack_require__) {
	
		const v1transpile_version = 6;
	
		module.exports = class {
		    constructor() {
		        const config = __webpack_require__(16);
		        if (!window.v1transpile || window.v1transpile.version < v1transpile_version) {
		            window.v1transpile = window.v1transpile || {};
		            window.v1transpile.version = v1transpile_version;
		            window.v1transpile.Plugin = window.v1transpile.Plugin || __webpack_require__(3);
		            window.v1transpile.PluginApi = window.v1transpile.PluginApi || __webpack_require__(4);
		            window.v1transpile.PluginStorage = window.v1transpile.PluginStorage || __webpack_require__(7);
		            window.v1transpile.Settings = window.v1transpile.Settings || {
		                /**
		                 * Create and return a new top-level settings panel
		                 * @author noodlebox
		                 * @return {jQuery}
		                 */
		                topPanel() {
		                    return $("<form>").addClass("form").css("width", "100%");
		                },
	
		                /**
		                 * Create and return a container for control groups
		                 * @author noodlebox
		                 * @return {jQuery}
		                 */
		                controlGroups() {
		                    return $("<div>").addClass("control-groups");
		                },
	
		                /**
		                 * Create and return a flexible control group
		                 * @author noodlebox
		                 * @param {object} settings Settings object
		                 * @param {Element|jQuery|string} settings.label an element or something JQuery-ish or, if string, use as plain text
		                 * @return {jQuery}
		                 */
		                controlGroup(settings) {
		                    const group = $("<div>").addClass("control-group");
	
		                    if (typeof settings.label === "string") {
		                        group.append($("<label>").text(settings.label));
		                    } else if (settings.label !== undefined) {
		                        group.append($("<label>").append(settings.label));
		                    }
	
		                    return group;
		                },
	
		                /**
		                 * Create and return a group of checkboxes
		                 * @author noodlebox
		                 * @param {object} settings Settings object
		                 * @param {object[]} settings.items an array of settings objects to be passed to checkbox()
		                 * @param {function(state)} settings.callback called with the current state, when it changes state is an array of boolean values
		                 * @return {jQuery}
		                 */
		                checkboxGroup(settings) {
		                    settings = $.extend({
		                        items: [],
		                        callback: $.noop,
		                    }, settings);
	
		                    const state = settings.items.map(item => item.checked === true);
	
		                    function onClick(i, itemState) {
		                        if (settings.items[i].callback !== undefined) {
		                            settings.items[i].callback(itemState);
		                        }
		                        state[i] = itemState;
		                        settings.callback(state);
		                    }
	
		                    const group = $("<ul>").addClass("checkbox-group");
	
		                    group.append(settings.items.map(function(item, i) {
		                        return checkbox($.extend({}, item, {
		                            callback: onClick.bind(undefined, i),
		                        }));
		                    }));
	
		                    return group;
		                },
	
		                /**
		                 * Create and return a checkbox
		                 * @author noodlebox
		                 * @param {object} settings Settings object
		                 * @param {Element|jQuery|string} settings.label an element or something JQuery-ish or, if string, use as plain text
		                 * @param {Element|jQuery|string} settings.help an element or something JQuery-ish or, if string, use as plain text
		                 * @param {boolean} settings.checked
		                 * @param {boolean} settings.disabled
		                 * @param {function(state)} settings.callback called with the current state, when it changes state is a boolean
		                 * @return {jQuery}
		                 */
		                checkbox(settings) {
		                    settings = $.extend({
		                        checked: false,
		                        disabled: false,
		                        callback: $.noop,
		                    }, settings);
	
		                    const input = $("<input>").attr("type", "checkbox")
		                        .prop("checked", settings.checked)
		                        .prop("disabled", settings.disabled);
	
		                    const inner = $("<div>").addClass("checkbox-inner")
		                        .append(input)
		                        .append($("<span>"));
	
		                    const outer = $("<div>").addClass("checkbox").append(inner);
	
		                    if (settings.disabled) {
		                        outer.addClass("disabled");
		                    }
	
		                    if (typeof settings.label === "string") {
		                        outer.append($("<span>").text(settings.label));
		                    } else if (settings.label !== undefined) {
		                        outer.append($("<span>").append(settings.label));
		                    }
	
		                    outer.on("click.kawaiiSettings", function() {
		                        if (!input.prop("disabled")) {
		                            const checked = !input.prop("checked");
		                            input.prop("checked", checked);
		                            settings.callback(checked);
		                        }
		                    });
	
		                    const item = $("<li>").append(outer);
	
		                    let help;
		                    if (typeof settings.help === "string") {
		                        help = $("<div>").text(settings.help);
		                    } else if (settings.help !== undefined) {
		                        help = $("<div>").append(settings.help);
		                    }
	
		                    if (help !== undefined) {
		                        help.appendTo(item)
		                            .addClass("help-text")
		                            .css("margin-top", "-3px")
		                            .css("margin-left", "27px");
		                    }
	
		                    return item;
		                },
	
		                /**
		                 * Create and return an input
		                 * @author samogot
		                 * @param {object} settings Settings object
		                 * @param {Element|jQuery|string} settings.label an element or something JQuery-ish or, if string, use as plain text
		                 * @param {Element|jQuery|string} settings.help an element or something JQuery-ish or, if string, use as plain text
		                 * @param {boolean} settings.value
		                 * @param {boolean} settings.disabled
		                 * @param {function(state)} settings.callback called with the current state, when it changes. state is a string
		                 * @return {jQuery}
		                 */
		                input(settings) {
		                    settings = $.extend({
		                        value: '',
		                        disabled: false,
		                        callback: $.noop,
		                    }, settings);
	
		                    const input = $("<input>").attr("type", "text")
		                        .prop("value", settings.value)
		                        .prop("disabled", settings.disabled);
	
		                    const inner = $("<div>").addClass("input-inner")
		                        .append(input)
		                        .append($("<span>"));
	
		                    const outer = $("<div>").addClass("input").append(inner);
	
		                    if (settings.disabled) {
		                        outer.addClass("disabled");
		                    }
	
		                    if (typeof settings.label === "string") {
		                        outer.append($("<span>").text(settings.label));
		                    } else if (settings.label !== undefined) {
		                        outer.append($("<span>").append(settings.label));
		                    }
	
		                    input.on("change.kawaiiSettings", function() {
		                        if (!input.prop("disabled")) {
		                            const value = input.val();
		                            settings.callback(value);
		                        }
		                    });
	
		                    const item = $("<li>").append(outer);
	
		                    let help;
		                    if (typeof settings.help === "string") {
		                        help = $("<div>").text(settings.help);
		                    } else if (settings.help !== undefined) {
		                        help = $("<div>").append(settings.help);
		                    }
	
		                    if (help !== undefined) {
		                        help.appendTo(item)
		                            .addClass("help-text")
		                            .css("margin-top", "-3px")
		                            .css("margin-left", "27px");
		                    }
	
		                    return item;
		                }
		            };
	
		            window.v1transpile.PluginApi.prototype.injectStyle = (id, css) => BdApi.injectCSS(id, css);
		            window.v1transpile.PluginApi.prototype.removeStyle = (id) => BdApi.clearCSS(id);
	
		            window.v1transpile.PluginStorage.prototype.load = function() {
		                this.settings = JSON.parse(JSON.stringify(this.defaultConfig));
		                this.path = this.path.replace('/settings.json', '');
		                if (!window.BdApi) {
		                    return;
		                }
		                try {
		                    const loadSettings = BdApi.getData(this.path, "settings");
		                    if (loadSettings) {
		                        Object.keys(loadSettings).map(key => {
		                            this.setSetting(key, loadSettings[key]);
		                        });
		                    }
		                } catch (err) {
		                    console.warn(this.path, ":", "unable to load settings:", err);
		                }
		            };
	
		            window.v1transpile.PluginStorage.prototype.save = function() {
		                const reduced = this.settings.reduce((result, item) => {
		                    result[item.id] = item.value;
		                    return result;
		                }, {});
		                try {
		                    BdApi.setData(this.path, "settings", reduced);
		                } catch (err) {
		                    console.warn(this.path, ":", "unable to save settings:", err);
		                }
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
	
		        const storage = new window.v1transpile.PluginStorage(config.info.name.replace(/\s+/g, '_').toLowerCase(), config.defaultSettings);
		        const BD = {
		            Api: new window.v1transpile.PluginApi(config.info),
		            Storage: storage,
		            Events: {},
		            Renderer: {}
		        };
	
		        const plugin = __webpack_require__(17)(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
		        this.pluginInstance = new plugin(config.info);
	
		        this.pluginInstance.internal = {
		            storage,
		            path: ''
		        };
		    }
	
		    start() {
		        this.pluginInstance.onStart();
		        this.pluginInstance.storage.load();
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
		        if (this.pluginInstance.storage.settings.length === 0)
		            return '';
		        const Settings = window.v1transpile.Settings;
	
		        const panel = Settings.topPanel();
		        const filterControls = Settings.controlGroups().appendTo(panel);
	
		        const Control = Settings.controlGroup({label: this.pluginInstance.name + " settings"})
		            .appendTo(filterControls);
		        const saveAndReload = () => {
		            this.pluginInstance.storage.save();
		            if (window.pluginCookie && window.pluginCookie[this.pluginInstance.name]) {
		                this.pluginInstance.onStop();
		                Promise.resolve().then(() => {
		                }).then(() => {
		                    this.pluginInstance.onStart();
		                });
		            }
		        };
		        for (let item of this.pluginInstance.storage.settings) {
		            let input;
		            switch (item.type) {
		                case 'bool':
		                    input = Settings.checkbox({
		                        label: item.text,
		                        help: item.description,
		                        checked: item.value,
		                        callback: state => {
		                            this.pluginInstance.storage.setSetting(item.id, state);
		                            saveAndReload();
		                        },
		                    });
		                    break;
		                case 'text':
		                    input = Settings.input({
		                        label: item.text,
		                        help: item.description,
		                        value: item.value,
		                        callback: state => {
		                            this.pluginInstance.storage.setSetting(item.id, state);
		                            saveAndReload();
		                        },
		                    });
		                    break;
		            }
		            if (input)
		                Control.append(input)
		        }
	
		        return panel[0];
		    }
		};
	
	/***/ }),
	/* 16 */
	/***/ (function(module, exports) {
	
		module.exports = {
			"info": {
				"name": "No send scroll",
				"authors": [
					"Samogot"
				],
				"version": "1.3",
				"description": "Disables scroll to bottom on sending message",
				"repository": "https://github.com/samogot/betterdiscord-plugins.git",
				"homepage": "https://github.com/samogot/betterdiscord-plugins/tree/master/v2/No%20send%20scroll",
				"reloadable": true
			},
			"defaultSettings": [],
			"permissions": []
		};
	
	/***/ }),
	/* 17 */
	/***/ (function(module, exports) {
	
		module.exports = (Plugin, BD) => {
	
		    const {Api} = BD;
	
		    const minDIVersion = '1.0';
		    if (!window.DiscordInternals) {
		        const message = `Lib Discord Internals v${minDIVersion} or higher not found! Please install or upgrade that utility plugin. See install instructions here https://goo.gl/kQ7UMV`;
		        Api.log(message, 'warn');
		        return (class EmptyStubPlugin extends Plugin {
		            onStart() {
		                Api.log(message, 'warn');
		                alert(message);
		                return false;
		            }
	
		            onStop() {
		                return true;
		            }
		        });
		    }
	
		    class V2Plugin extends Plugin {
	
		        onStart() {
		            const {monkeyPatch, WebpackModules, ReactComponents} = window.DiscordInternals;
		            const MessageActions = WebpackModules.findByUniqueProperties(['jumpToMessage', '_sendMessage']);
	
		            ReactComponents.get('Messages', Messages => {
		                this.cancelGlobalPatch = monkeyPatch(MessageActions, '_sendMessage', {
		                    before: () => {
		                        const cancel = monkeyPatch(Messages.prototype, 'componentDidUpdate', {
		                            instead: ({callOriginalMethod, thisObject}) => {
		                                if (thisObject.state && thisObject.state.messages && !thisObject.state.messages.hasMoreAfter && !thisObject.isAtBottom()) {
		                                    thisObject.state.messages.hasMoreAfter = true;
		                                    callOriginalMethod();
		                                    thisObject.state.messages.hasMoreAfter = false;
		                                }
		                                else callOriginalMethod();
		                            }
		                        });
		                        setTimeout(cancel, 1000);
		                    }
		                });
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

/*@end @*/  

