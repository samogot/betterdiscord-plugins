//META{"name":"p_quoter"}*//

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

	var p_quoter =
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
	
		module.exports = __webpack_require__(18);
	
	
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
	/* 15 */,
	/* 16 */,
	/* 17 */,
	/* 18 */
	/***/ (function(module, exports, __webpack_require__) {
	
		const v1transpile_version = 6;
	
		module.exports = class {
		    constructor() {
		        const config = __webpack_require__(19);
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
								.prop("disabled", settings.disabled)
								.css("pointer-events", "none");
	
		                    const inner = $("<div>").addClass("checkbox-inner")
		                        .append(input)
		                        .append($("<span>"));
	
		                    const outer = $("<div>").addClass("checkbox")
													.css("display", "flex")
													.css("cursor", "pointer")
													.append(inner);
	
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
	
		                    const outer = $("<div>").addClass("input").css("display", "flex").append(inner);
	
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
	
		        const plugin = __webpack_require__(20)(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
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
	/* 19 */
	/***/ (function(module, exports) {
	
		module.exports = {
			"info": {
				"name": "Quoter",
				"authors": [
					"Samogot"
				],
				"version": "3.14",
				"description": "Add citation using embeds",
				"repository": "https://github.com/samogot/betterdiscord-plugins.git",
				"homepage": "https://github.com/samogot/betterdiscord-plugins/tree/master/v2/Quoter",
				"reloadable": true
			},
			"defaultSettings": [
				{
					"id": "embeds",
					"type": "bool",
					"text": "Use embeds for quoting",
					"description": "Use embeds if possible and fallback to markdown-formated quotes otherwise. Markdown-formated (fallback) mode is text-only and is considered more safe, so it is default. Quoter don't use bot api to post embeds, but not everybody knows it, so some people might think that you are selfbot. It is recommended to not use embed mode in converstion with Discord stuff. Also orthodox admins of some servers may threat to ban you because of some rumors about selfbots. So USE AT YOUR OWN RISK! :)",
					"value": false
				},
				{
					"id": "noEmbedsServers",
					"type": "text",
					"multiline": false,
					"text": "Don't use embeds on this servers",
					"description": "Some servers disallow self-botting. Despite this plugin isn't a bot, it's hard to approve it. So if on some server users not allowed to use embeds, you can add that server ID to this space separated black list. To get server id see this instructions: https://goo.gl/w77phg",
					"value": ""
				},
				{
					"id": "utc",
					"type": "bool",
					"text": "Use UTC TimeZone",
					"description": "Use UTC TimeZone to display time in fallback mode",
					"value": false
				},
				{
					"id": "24h",
					"type": "bool",
					"text": "Use 24h format",
					"description": "Use 24h format to display time in fallback mode",
					"value": true
				},
				{
					"id": "mention",
					"type": "bool",
					"text": "Mention cited users",
					"description": "Automatically add mention of users, whose messages are cited",
					"value": false
				},
				{
					"id": "citeFull",
					"type": "bool",
					"text": "Cite full message group",
					"description": "Clicking on quote icon cause citing full message group instead of one message. Use Alt+Click to quote single message.",
					"value": true
				}
			],
			"permissions": []
		};
	
	/***/ }),
	/* 20 */
	/***/ (function(module, exports) {
	
		module.exports = (Plugin, BD, Vendor, v1) => {
	
		    const {Api, Storage} = BD;
		    let {$} = Vendor;
	
		    const minDIVersion = '1.12';
		    if (!window.DiscordInternals || !window.DiscordInternals.version ||
		        window.DiscordInternals.versionCompare(window.DiscordInternals.version, minDIVersion) < 0) {
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
	
		    const {monkeyPatch, WebpackModules, ReactComponents, getOwnerInstance, React, Renderer, Filters} = window.DiscordInternals;
	
		    // Deffer module loading
		    let moment, Constants, GuildsStore, UsersStore, MembersStore, UserSettingsStore, MessageActions, MessageQueue,
		        MessageParser, HistoryUtils, PermissionUtils, ContextMenuActions, ModalsStack, ContextMenuItemsGroup,
		        ContextMenuItem, ExternalLink, ConfirmModal, MessageGroup, ChannelStore, SelectedChannelStore,
		        DraftStore, DraftActions, BackgroundOpacityContext;
	
		    function loadAllModules() {
		        moment = WebpackModules.findByUniqueProperties(['parseZone']);
	
		        Constants = WebpackModules.findByUniqueProperties(['Routes', 'ChannelTypes']);
	
		        GuildsStore = WebpackModules.findByUniqueProperties(['getGuild']);
		        ChannelStore = WebpackModules.findByUniqueProperties(['getChannel']);
		        DraftStore = WebpackModules.findByUniqueProperties(['getDraft']);
		        DraftActions = WebpackModules.findByUniqueProperties(['changeDraft']);
		        SelectedChannelStore = WebpackModules.findByUniqueProperties(['getChannelId']);
		        UsersStore = WebpackModules.findByUniqueProperties(['getUser', 'getCurrentUser']);
		        MembersStore = WebpackModules.findByUniqueProperties(['getNick']);
		        UserSettingsStore = WebpackModules.findByUniqueProperties(['developerMode', 'locale']);
	
		        MessageActions = WebpackModules.findByUniqueProperties(['jumpToMessage', '_sendMessage']);
		        MessageQueue = WebpackModules.findByUniqueProperties(['enqueue']);
		        MessageParser = WebpackModules.findByUniqueProperties(['createMessage', 'parse', 'unparse']);
		        HistoryUtils = WebpackModules.findByUniqueProperties(['transitionTo', 'replaceWith', 'getHistory']);
		        PermissionUtils = WebpackModules.findByUniqueProperties(['getChannelPermissions', 'can']);
		        ContextMenuActions = WebpackModules.findByUniqueProperties(['closeContextMenu']);
	
		        BackgroundOpacityContext = WebpackModules.findByUniqueProperties(['BackgroundOpacityContext']);
	
		        ModalsStack = WebpackModules.findByUniqueProperties(['push', 'update', 'pop', 'popWithKey']);
		        ContextMenuItemsGroup = WebpackModules.find(Filters.byCode(/itemGroup/));
		        ContextMenuItemsGroup.displayName = 'ContextMenuItemsGroup';
		        ContextMenuItem = WebpackModules.find(Filters.byCode(/\.label\b.*\.hint\b.*\.action\b/));
		        ContextMenuItem.displayName = 'ContextMenuItem';
		        ExternalLink = WebpackModules.find(m => m && m.toString && m.toString([]).includes("trusted"));
		        ExternalLink.displayName = 'ExternalLink';
		        ConfirmModal = WebpackModules.find(Filters.byPrototypeFields(['handleCancel', 'handleSubmit', 'handleMinorConfirm']));
		        ConfirmModal.displayName = 'ConfirmModal';
		        // const TooltipWrapper = WebpackModules.find(Filters.byPrototypeFields(['showDelayed']));
		        // TooltipWrapper.displayName = 'TooltipWrapper';
		    }
	
		    ReactComponents.setName('Message', Filters.byPrototypeFields(['renderCozy', 'renderCompact']));
		    ReactComponents.setName('MessageContent', m => m.defaultProps && m.defaultProps.hasOwnProperty("disableButtons"));
		    // ReactComponents.setName('ChannelTextAreaForm', Filters.byPrototypeFields(['handleTextareaChange', 'render']));
		    // ReactComponents.setName('OptionPopout', Filters.byPrototypeFields(['handleCopyId', 'handleEdit', 'handleRetry', 'handleDelete', 'handleReactions', '', '', '', '']));
		    ReactComponents.setName('Embed', Filters.byPrototypeFields(['renderProvider', 'renderAuthor', 'renderFooter', 'renderTitle', 'renderDescription', 'renderFields', 'renderImage', 'renderVideo']));
		    ReactComponents.setName('MessageContextMenu', Filters.byCode(/\.ContextMenuTypes\.MESSAGE_MAIN\b[\s\S]*\.ContextMenuTypes\.MESSAGE_SYSTEM\b/, c => c.prototype && c.prototype.render));
		    ReactComponents.setName('MessageResendItem', Filters.byPrototypeFields(['handleResendMessage', 'render']));
		    ReactComponents.setName('MessageGroup', m => m.defaultProps && m.defaultProps.disableManageMessages);
		    MessageGroup = WebpackModules.find(m => m.defaultProps && m.defaultProps.disableManageMessages);
		    if (MessageGroup) MessageGroup.displayName = 'MessageGroup';
	
		    const BASE_JUMP_URL = 'https://github.com/samogot/betterdiscord-plugins/blob/master/v2/Quoter/link-stub.md';
	
		    class QuoterPlugin extends Plugin {
	
		        // Life cycle
	
		        constructor(props) {
		            super(props);
		            this.cancelPatches = [];
		            this.quotes = [];
		            this.copyKeyPressed = false;
		            this.onCopyKeyPressed = this.onCopyKeyPressed.bind(this);
		            this.onCopy = this.onCopy.bind(this);
		        }
	
		        onStart() {
		            if (v1) {
		                $ = Vendor.$;
		            }
		            if (window.ZLibrary) {
		                const versioner = (content) => {
		                    const remoteVersion = content.match(/['"][0-9]+\.[0-9]+['"]/i);
		                    if (!remoteVersion) return "0.0";
		                    return remoteVersion.toString().replace(/['"]/g, "");
		                };
		                const comparator = (current, remote) => remote > current;
		                window.ZLibrary.PluginUpdater.checkForUpdate("Quoter", this.version, "https://raw.githubusercontent.com/samogot/betterdiscord-plugins/master/v1/quoter.plugin.js", versioner, comparator);
		            }
		            loadAllModules();
		            Api.injectStyle(QuoterPlugin.styleId, QuoterPlugin.style);
		            $(document).on("keydown.quoter", this.onCopyKeyPressed);
		            $(document).on("copy.quoter", this.onCopy);
		            // Embeds engine
		            this.patchSendMessageWithEmbed();
		            this.patchRetrySendMessageFromOptionPopout();
		            this.patchRetrySendMessageFromContextMenu();
		            // Main extension point
		            this.patchSendMessageForSplitAndPassEmbeds();
		            // UI
		            this.patchJumpLinkClick();
		            this.patchEmbedDate();
		            this.patchMessageContextMenuRender();
		            this.patchMessageRender();
		            return true;
		        }
	
		        onStop() {
		            Api.removeStyle(QuoterPlugin.styleId);
		            $(document).off("keydown.quoter", this.onCopyKeyPressed);
		            $(document).off("copy.quoter", this.onCopy);
		            this.cancelAllPatches();
		            return true;
		        }
	
		        cancelAllPatches() {
		            for (let cancel of this.cancelPatches) {
		                cancel();
		            }
		        }
	
		        // Helpers
	
		        static getCurrentChannel() {
		            return ChannelStore.getChannel(SelectedChannelStore.getChannelId());
		        }
	
		        static getIdsFromLink(href) {
		            const regex = new RegExp('^' + BASE_JUMP_URL + '\\?guild_id=([^&]+)&channel_id=([^&]+)&message_id=([^&]+)(?:&author_id=([^&]+))?$');
		            const match = regex.exec(href);
		            if (!match) return null;
		            return {
		                guild_id: match[1],
		                channel_id: match[2],
		                message_id: match[3],
		                author_id: match[4],
		            };
		        }
	
		        // Embeds engine
	
		        patchSendMessageWithEmbed() {
		            const cancel = monkeyPatch(MessageActions, '_sendMessage', {
		                before: ({methodArguments: [channel, message]}) => {
		                    if (message.embed && message.embed.quoter) {
		                        monkeyPatch(MessageQueue, 'enqueue', {
		                            once: true,
		                            before: ({methodArguments: [action]}) => {
		                                if (action.type === 'send') {
		                                    action.message.embed = message.embed;
		                                }
		                            }
		                        });
		                        monkeyPatch(MessageParser, 'createMessage', {
		                            once: true,
		                            after: ({returnValue}) => {
		                                if (returnValue) {
		                                    returnValue.embeds.push(message.embed);
		                                }
		                            }
		                        });
		                    }
		                }
		            });
		            this.cancelPatches.push(cancel);
		        }
	
		        patchRetrySendMessageFromOptionPopout() {
		            ReactComponents.get('OptionPopout', OptionPopout => {
		                const cancel = monkeyPatch(OptionPopout.prototype, 'handleRetry', {
		                    before: this.patchCallbackPassEmbedFromPropsToSendMessage
		                });
		                this.cancelPatches.push(cancel);
		                this.cancelPatches.push(Renderer.rebindMethods(OptionPopout, ['handleRetry']));
		            });
		        }
	
		        patchRetrySendMessageFromContextMenu() {
		            ReactComponents.get('MessageResendItem', MessageResendItem => {
		                moment.locale(UserSettingsStore.locale);
		                const cancel = monkeyPatch(MessageResendItem.prototype, 'handleResendMessage', {
		                    before: this.patchCallbackPassEmbedFromPropsToSendMessage
		                });
		                this.cancelPatches.push(cancel);
		                this.cancelPatches.push(Renderer.rebindMethods(MessageResendItem, ['handleResendMessage']));
		            });
		        }
	
		        patchCallbackPassEmbedFromPropsToSendMessage({thisObject}) {
		            if (thisObject.props.message && thisObject.props.message.embeds) {
		                const embed = thisObject.props.message.embeds.find(embed => embed.quoter);
		                if (embed) {
		                    monkeyPatch(MessageActions, '_sendMessage', {
		                        once: true,
		                        before: ({methodArguments: [channel, message]}) => {
		                            message.embed = embed;
		                        }
		                    });
		                }
		            }
		        }
	
		        // Main extension point
	
		        patchSendMessageForSplitAndPassEmbeds() {
		            const cancel = monkeyPatch(MessageActions, 'sendMessage', {
		                instead: ({methodArguments, originalMethod, thisObject}) => {
		                    if (!this.quotes.length) {
		                        const sendOriginal = originalMethod.bind(thisObject);
		                        return sendOriginal(...methodArguments);
		                    }
		                    const [channelId, message] = methodArguments;
		                    const sendMessageDirrect = originalMethod.bind(thisObject, channelId);
		                    const currentChannel = QuoterPlugin.getCurrentChannel();
		                    const serverIDs = this.getSetting('noEmbedsServers').split(/\D+/);
		                    if (this.getSetting('embeds') && !serverIDs.includes(currentChannel.guild_id) && (currentChannel.isPrivate() || PermissionUtils.can(0x4800, currentChannel))) {
		                        this.splitMessageAndPassEmbeds(message, sendMessageDirrect);
		                    } else {
		                        const sendMessageFallback = QuoterPlugin.sendWithFallback.bind(null, sendMessageDirrect, channelId);
		                        this.splitMessageAndPassEmbeds(message, sendMessageFallback);
		                    }
		                }
		            });
		            this.cancelPatches.push(cancel);
		        }
	
		        // Send Logic
	
		        static sendWithFallback(sendMessage, channelId, message) {
		            if (message.embed) {
		                const timestamp = moment(message.embed.timestamp);
		                if (Storage.getSetting('utc')) timestamp.utc();
		                const author = Storage.getSetting('mention') ? `<@${message.embed.author.id}>` : message.embed.author.name;
		                const timeFormat = Storage.getSetting('24h') ? 'YYYY-MM-DD HH:mm Z' : 'YYYY-MM-DD h:mm A Z';
		                message.content += `\n*${author} - ${timestamp.format(timeFormat)}${message.embed.footer.text ? ' | ' + message.embed.footer.text : ''}*`;
		                message.content += `\n${'```'}\n${MessageParser.unparse(message.embed.description, channelId).replace(/\n?(```((\w+)?\n)?)+/g, '\n').trim()}\n${'```'}`;
		                message.content = message.content.trim();
		                message.embed = null;
		            }
		            sendMessage(message);
		        }
	
		        splitMessageAndPassEmbeds(message, sendMessage) {
		            const regex = /([\S\s]*?)(::(?:re:)?quote(\d+)(?:-(\d+))?::)/g;
		            let match, lastIndex = 0;
		            const currChannel = QuoterPlugin.getCurrentChannel();
		            while (match = regex.exec(message.content)) {
		                lastIndex = match.index + match[0].length;
		                let text = match[1];
		                const embeds = [];
		                const from_i = +match[3];
		                const to_i = +match[4] || from_i;
		                if (to_i <= this.quotes.length) {
		                    for (let i = from_i; i <= to_i; ++i) {
		                        const quote = this.quotes[i - 1];
		                        if (embeds.length > 0 && embeds[embeds.length - 1].author.id === quote.message.author.id
		                            && (!embeds[embeds.length - 1].image || !quote.message.attachments.some(att => att.width))) {
		                            this.appendToEmbed(embeds[embeds.length - 1], quote);
		                        } else {
		                            embeds.push(this.parseNewEmbed(quote, currChannel));
		                        }
		                    }
		                } else {
		                    text += match[2];
		                }
		                text = text.trim() || ' ';
		                if (embeds.length > 0) {
		                    for (let embed of embeds) {
		                        sendMessage(Object.assign({}, message, {content: text, embed}));
		                        text = ' ';
		                    }
		                } else {
		                    sendMessage(Object.assign({}, message, {content: text}));
		                }
		            }
		            if (lastIndex < message.content.length) {
		                sendMessage(Object.assign({}, message, {content: message.content.substr(lastIndex)}));
		            }
		            for (let quote of this.quotes) {
		                quote.message.quotedContent = undefined;
		            }
		            this.quotes = [];
		        }
	
		        appendToEmbed(embed, quote) {
		            if (!embed.description)
		                embed.description = quote.text.trim();
		            else
		                embed.description += '\n' + quote.text.trim();
		            for (let attachment of quote.message.attachments) {
		                if (attachment.width) {
		                    embed.image = attachment;
		                } else {
		                    let emoji = '📁';
		                    if (/(.apk|.appx|.pkg|.deb)$/.test(attachment.filename)) {
		                        emoji = '📦';
		                    }
		                    if (/(.jpg|.png|.gif)$/.test(attachment.filename)) {
		                        emoji = '🖼';
		                    }
		                    if (/(.zip|.rar|.tar.gz)$/.test(attachment.filename)) {
		                        emoji = '📚';
		                    }
		                    if (/(.txt)$/.test(attachment.filename)) {
		                        attachment.filename = '📄';
		                    }
		                    embed.fields.push({
		                        name: `${this.L.attachment} #${embed.fields.length + 1}`,
		                        value: `${emoji} [${attachment.filename.replace(/([_\W])/g, '\\$1')}](${attachment.url})`
		                    });
		                }
		            }
		        }
	
		        parseNewEmbed(quote, currChannel) {
		            const embed = {
		                author: {
		                    id: quote.message.author.id,
		                    name: quote.message.nick || quote.message.author.username,
		                    icon_url: quote.message.author.avatar_url || new URL(quote.message.author.getAvatarURL(), location.href).href,
		                    url: `${BASE_JUMP_URL}?guild_id=${quote.channel.guild_id || '@me'}&channel_id=${quote.channel.id}&message_id=${quote.message.id}&author_id=${quote.message.author.id}`
		                },
		                footer: {},
		                timestamp: quote.message.timestamp.toISOString(),
		                fields: [],
		                color: quote.message.colorString && Number(quote.message.colorString.replace('#', '0x')),
		                quoter: true
		            };
		            if (currChannel.id !== quote.channel.id) {
		                if (quote.channel.guild_id && quote.channel.guild_id !== '@me') {
		                    embed.footer.text = '#' + quote.channel.name;
		                    if (currChannel.guild_id !== quote.channel.guild_id) {
		                        embed.footer.text += ' | ' + GuildsStore.getGuild(quote.channel.guild_id).name
		                    }
		                } else if (quote.channel.footer_text) {
		                    embed.footer.text = quote.channel.footer_text;
		                } else {
		                    embed.footer.text = quote.channel.recipients
		                        .slice(0, 5)
		                        .map(id => currChannel.guild_id && MembersStore.getNick(currChannel.guild_id, id) || UsersStore.getUser(id).username)
		                        .concat(quote.channel.recipients.length > 5 ? '...' : [])
		                        .join(', ');
		                    if (quote.channel.name) {
		                        embed.footer.text = `${quote.channel.name} (${embed.footer.text})`;
		                    } else if (quote.channel.recipients.length === 1) {
		                        embed.footer.text = '@' + embed.footer.text;
		                    }
		                }
		            }
		            this.appendToEmbed(embed, quote);
		            return embed;
		        }
	
		        // UI
	
		        patchEmbedDate() {
		            ReactComponents.get('Embed', Embed => {
		                const cancel = Renderer.patchRender(Embed, [
		                    {
		                        selector: {
		                            className: 'embedFooter-3yVop-',
		                            child: {
		                                text: true,
		                                nthChild: -1
		                            }
		                        },
		                        method: 'replace',
		                        content: thisObject => thisObject.props.embed.timestamp.calendar()
		                    }
		                ]);
		                this.cancelPatches.push(cancel);
		            });
	
		        }
	
		        patchJumpLinkClick() {
		            const cancel = monkeyPatch(ExternalLink.prototype, 'render', {
		                before: ({thisObject}) => {
		                    let ids;
		                    if (thisObject.props.href && (ids = QuoterPlugin.getIdsFromLink(thisObject.props.href))) {
		                        thisObject.props.onClick = e => {
		                            HistoryUtils.transitionTo(Constants.Routes.MESSAGE(ids.guild_id, ids.channel_id, ids.message_id));
		                            e.preventDefault();
		                        }
		                    }
		                }
		            });
		            this.cancelPatches.push(cancel);
		            this.cancelPatches.push(Renderer.rebindMethods(ExternalLink, ['render']));
		        }
	
		        patchMessageRender() {
		            ReactComponents.get('MessageContent', MessageContent => {
		                const cancel = Renderer.patchRender(MessageContent, [
		                    {
		                        selector: {
		                            type: BackgroundOpacityContext.Consumer
		                        },
		                        method: 'patchRenderProp',
		                        content: thisObject => ({
		                            propName: 'children',
		                            actions: [{
		                                selector: {
		                                    className: 'buttonContainer-37UsAw',
		                                },
		                                method: 'prepend',
		                                content: React.createElement("div", {
		                                    className: "btn-quote",
		                                    onClick: this.onQuoteMessageClick.bind(this, thisObject.props.channel, thisObject.props.message),
		                                    onMouseDown: e => {
		                                        e.preventDefault();
		                                        e.stopPropagation();
		                                    }
		                                })
		                            }]
		                        })
		                    }
		                ]);
		                this.cancelPatches.push(cancel);
		            });
		        }
	
		        patchMessageContextMenuRender() {
		            ReactComponents.get('MessageContextMenu', MessageContextMenu => {
		                if (MessageContextMenu.prototype.render.__monkeyPatched) return;
		                const cancel = Renderer.patchRender(MessageContextMenu, [
		                    {
		                        selector: {
		                            type: ContextMenuItemsGroup,
		                        },
		                        method: 'append',
		                        content: thisObject => React.createElement(ContextMenuItem, {
		                            label: this.L.quoteContextMenuItem,
		                            hint: 'Ctrl+Shift+C',
		                            action: this.onQuoteMessageClick.bind(this, thisObject.props.channel, thisObject.props.message)
		                        })
		                    }
		                ]);
		                this.cancelPatches.push(cancel);
		            });
		        }
	
		        // Listeners
	
		        onCopyKeyPressed(e) {
		            if (e.which === 67 && e.ctrlKey && e.shiftKey) {
		                e.preventDefault();
		                const channel = QuoterPlugin.getCurrentChannel();
		                let text = this.quoteSelection(channel);
		                text += this.getMentions(channel);
		                if (text) {
		                    this.copyKeyPressed = text;
		                    document.execCommand('copy');
		                }
		            }
		        }
	
		        onCopy(e) {
		            if (!this.copyKeyPressed) {
		                return;
		            }
		            e.originalEvent.clipboardData.setData('Text', this.copyKeyPressed);
		            this.copyKeyPressed = false;
		            e.preventDefault();
		        }
	
		        onQuoteMessageClick(channel, message, e) {
		            e.preventDefault();
		            e.stopPropagation();
		            ContextMenuActions.closeContextMenu();
		            const oldText = this.tryClearQuotes();
		            const citeFull = this.getSetting('citeFull');
	
		            let newText;
		            if (QuoterPlugin.isMessageInSelection(message)) {
		                newText = this.quoteSelection(channel);
		            } else if (e.ctrlKey || e.shiftKey || citeFull && !e.altKey) {
		                const group = QuoterPlugin.getMessageGroup(message);
		                if (e.shiftKey) {
		                    newText = this.quoteMessageGroup(channel, group);
		                } else {
		                    newText = this.quoteMessageGroup(channel, group.slice(group.indexOf(message)));
		                }
		            } else {
		                newText = this.quoteMessageGroup(channel, [message]);
		            }
		            newText += this.getMentions(channel, oldText);
	
		            if (newText) {
		                if (channel.isPrivate() || PermissionUtils.can(0x800, channel)) {
		                    const text = !oldText ? newText : /\n\s*$/.test(oldText) ? oldText + newText : oldText + '\n' + newText;
		                    DraftActions.saveDraft(channel.id, text);
		                } else {
		                    const L = this.L;
		                    this.copyKeyPressed = newText;
		                    document.execCommand('copy');
		                    ModalsStack.push(function(props) { // Can't use arrow function here
		                        return React.createElement(ConfirmModal, Object.assign({
		                            title: L.canNotQuoteHeader,
		                            body: L.canNotQuoteBody,
		                            // confirmText: Constants.Messages.OKAY
		                        }, props));
		                    })
		                }
		            }
		        }
	
		        // Quote Logic
	
		        tryClearQuotes() {
		            const oldText = DraftStore.getDraft(QuoterPlugin.getCurrentChannel().id);
		            if (!/::(?:re:)?quote\d+(?:-\d+)?::/.test(oldText)) {
		                this.quotes = [];
		            }
		            return oldText;
		        }
	
		        static isMessageInSelection(message) {
		            const selection = window.getSelection();
		            if (selection.isCollapsed) return false;
		            const range = selection.getRangeAt(0);
		            return !range.collapsed && $('.message-1PNnaP').is((i, element) => range.intersectsNode(element)
		                && getOwnerInstance(element, {include: ["Message"]}).props.message.id === message.id);
		        }
	
		        static getMessageGroup(message) {
		            const $messageGroups = $('.container-1YxwTf').toArray();
		            for (let element of $messageGroups) {
		                const messages = getOwnerInstance(element, {include: ["MessageGroup"]}).props.messages;
		                if (messages.includes(message)) {
		                    return messages;
		                }
		            }
		            return [message];
		        }
	
		        getMentions(channel, oldText) {
		            let mentions = '';
		            if (this.getSetting('embeds') && this.getSetting('mention')) {
		                for (let quote of this.quotes) {
		                    const mention = MessageParser.unparse(`<@${quote.message.author.id}>`, channel.id);
		                    if (!mentions.includes(mention) && (!oldText || !oldText.includes(mention))) {
		                        mentions += mention + ' ';
		                    }
		                }
		            }
		            return mentions
		        }
	
		        quoteMessageGroup(channel, messages) {
		            let count = 0;
		            for (let message of messages) {
		                if ((message.quotedContent || message.content).trim() || message.attachments.length > 0) {
		                    ++count;
		                    this.quotes.push({text: message.quotedContent || message.content, message, channel});
		                }
		            }
		            if (count > 1) {
		                return `::quote${this.quotes.length - count + 1}-${this.quotes.length}::\n`;
		            } else if (count === 1) {
		                return `::quote${this.quotes.length}::\n`;
		            }
		            return '';
		        }
	
		        quoteSelection(channel) {
		            const range = getSelection().getRangeAt(0);
		            const $clone = $(range.cloneContents());
	
		            const $markupsAndAttachments = $('.markup-2BOw-j,.imageWrapper-2p5ogY,.embed-thumbnail-rich').filter((i, element) => range.intersectsNode(element));
		            const $markups = $markupsAndAttachments.filter('.markup-2BOw-j');
	
		            if ($markups.length === 0 && $markupsAndAttachments.length === 0) {
		                return '';
		            }
	
		            const quotes = [];
		            const $clonedMarkups = $clone.children().find('.markup-2BOw-j');
	
		            if ($markups.length === 0) {
		                const quote = QuoterPlugin.getQuoteFromMarkupElement(channel, $markupsAndAttachments[0]);
		                if (quote) {
		                    quote.message.quotedContent = quote.text = '';
		                    quotes.push(quote);
		                }
		            } else if ($markups.length === 1) {
		                const quote = QuoterPlugin.getQuoteFromMarkupElement(channel, $markups[0]);
		                if (quote) {
		                    quote.message.quotedContent = quote.text = QuoterPlugin.parseSelection(channel, $clonedMarkups.add($('<div>').append($clone)).first());
		                    quotes.push(quote);
		                }
		            } else {
		                $markups.each((i, e) => {
		                    const quote = QuoterPlugin.getQuoteFromMarkupElement(channel, e);
		                    if (quote) {
		                        quotes.push(quote);
		                    }
		                });
		                quotes[0].message.quotedContent = quotes[0].text = QuoterPlugin.parseSelection(channel, $clonedMarkups.first());
		                quotes[quotes.length - 1].message.quotedContent = quotes[quotes.length - 1].text = QuoterPlugin.parseSelection(channel, $clonedMarkups.last());
		            }
	
		            let string = '';
		            const group = [];
		            const processGroup = () => {
		                if (group[0].re) {
		                    this.quotes.push(group[0]);
		                    string += `::re:quote${this.quotes.length}::\n`;
		                } else {
		                    string += this.quoteMessageGroup(channel, group.map(g => g.message));
		                }
		            };
	
		            for (let quote of quotes) {
		                if (quote.text.trim() || quote.message.attachments.length > 0) {
		                    if (group.length === 0 || !group[0].re && !quote.re && $(quote.markup).closest('.container-1YxwTf').is($(group[0].markup).closest('.container-1YxwTf'))) {
		                        group.push(quote);
		                    } else {
		                        processGroup();
		                        group.length = 0;
		                        group.push(quote);
		                    }
		                }
		            }
		            if (group.length > 0) {
		                processGroup();
		            }
		            return string;
		        }
	
		        static parseSelection(channel, $markup) {
		            $markup.find('a').each((i, e) => {
		                const $e = $(e);
		                $(e).html(`[${$e.text()}](${$e.attr('href')})`);
		            });
		            $markup.find('pre').each((i, e) => {
		                const $e = $(e);
		                $e.html(`${$e.find('code').attr('class').split(' ')[1] || ''}\n${$e.find('code').text()}`);
		            });
		            $markup.find('.emotewrapper').each((i, e) => {
		                const $e = $(e);
		                $e.html($e.find('img').attr('alt'));
		            });
		            $markup.find('.emoji').each((i, e) => {
		                const $e = $(e);
		                if ($e.attr('src').includes('assets/')) {
		                    $e.html($e.attr('alt'));
		                }
		                if ($e.attr('src').includes('emojis/')) {
		                    $e.html(`<${$e.attr('alt')}${$e.attr('src').split('/').pop().replace('.png', '')}>`);
		                }
		            });
		            $markup.find('time,.usernameWrapper-1S-G5O').detach();
		            $markup.html($markup.html().replace(/<\/?pre>/g, "```"));
		            $markup.html($markup.html().replace(/<\/?code( class="inline")?>/g, "`"));
		            $markup.html($markup.html().replace(/<\/?strong>/g, "**"));
		            $markup.html($markup.html().replace(/<\/?em>/g, "*"));
		            $markup.html($markup.html().replace(/<\/?s>/g, "~~"));
		            $markup.html($markup.html().replace(/<\/?u>/g, "__"));
		            return MessageParser.parse(channel, $markup.text()).content
		        }
	
		        static getQuoteFromMarkupElement(channel, markup) {
		            if ($(markup).parents(".content-3dzVd8").find('.embed-IeVjo6').length > 0) {
		                const $embed = $(markup).parents(".content-3dzVd8").find('.embedInner-1-fpTo');
		                const $embedAuthorName = $embed.find('.embedAuthorName-3mnTWj');
		                if ($embed.length > 0 && $embedAuthorName.attr('href') && $embedAuthorName.attr('href').indexOf(BASE_JUMP_URL) === 0) {
		                    const ids = QuoterPlugin.getIdsFromLink($embedAuthorName.attr('href'));
		                    const embed = getOwnerInstance($embed[0], {include: ["Embed"]}).props.embed;
		                    const attachments = Array.from($embed.find('.embedFieldValue-nELq2s a')).map(e => ({
		                        url: $(e).attr('href'),
		                        filename: $(e).text()
		                    }));
		                    if (embed.image) attachments.push(embed.image);
		                    return {
		                        re: true,
		                        message: {
		                            id: ids.message_id,
		                            author: {
		                                id: ids.author_id,
		                                username: '> ' + embed.author.name,
		                                avatar_url: embed.author.iconURL
		                            },
		                            timestamp: moment(embed.timestamp),
		                            colorString: embed.color && '#' + embed.color.toString(16),
		                            attachments: attachments,
		                            content: embed.description,
		                        },
		                        channel: {
		                            guild_id: ids.guild_id,
		                            id: ids.channel_id,
		                            footer_text: embed.footer && embed.footer.text,
		                            name: embed.footer && embed.footer.text ? embed.footer.text.substr(1).split(' | ')[0] : channel.name
		                        },
		                        text: embed.description,
		                        markup
		                    }
		                }
		            } else {
		                const props = getOwnerInstance(markup, {include: ["Message"]}).props;
		                return {
		                    message: props.message,
		                    channel: props.channel,
		                    text: props.message.content,
		                    markup
		                }
		            }
		        }
	
		        // Resources
	
		        static get style() {
		            // language=CSS
		            return `
		                .container-1YxwTf .btn-quote {
		                    opacity: .4;
		                    float: right;
		                    width: 16px;
		                    height: 16px;
		                    background-size: 16px 16px;
		                    cursor: pointer;
		                    user-select: none;
		                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 25"><path fill="#99AAB5" d="M18 6.5c0-2 .7-3.5 2-4.7C21.3.6 23 0 25 0c2.5 0 4.4.8 6 2.4C32.2 4 33 6 33 8.8s-.4 5-1.3 7c-.8 1.8-1.8 3.4-3 4.7-1.2 1.2-2.5 2.2-3.8 3L21.4 25l-3.3-5.5c1.4-.6 2.5-1.4 3.5-2.6 1-1.4 1.5-2.7 1.6-4-1.3 0-2.6-.6-3.7-1.8-1-1.2-1.7-2.8-1.7-4.8zM.4 6.5c0-2 .6-3.5 2-4.7C3.6.6 5.4 0 7.4 0c2.3 0 4.3.8 5.7 2.4C14.7 4 15.5 6 15.5 8.8s-.5 5-1.3 7c-.7 1.8-1.7 3.4-3 4.7-1 1.2-2.3 2.2-3.6 3C6 24 5 24.5 4 25L.6 19.5C2 19 3.2 18 4 17c1-1.3 1.6-2.6 1.8-4-1.4 0-2.6-.5-3.8-1.7C1 10 .4 8.5.4 6.5z"/></svg>') 50% no-repeat;
		                    margin-left: 6px;
		                }
	
		                .btn-reaction {
		                    margin-left: 4px;
		                }
	
		                .container-1YxwTf .btn-quote:hover {
		                    opacity: 1;
		                }
		            `;
		        }
	
		        static get styleId() {
		            return "Quoter-plugin-style";
		        }
	
		        get locales() {
		            return {
		                'pt-BR': {
		                    quoteContextMenuItem: "Citar",
		                    quoteTooltip: "Citar",
		                    attachment: "Anexo",
		                },
		                'ru': {
		                    quoteContextMenuItem: "Цитировать",
		                    quoteTooltip: "Цитировать",
		                    attachment: "Вложение",
		                    canNotQuoteHeader: "Вы не можете цитировать в этот канал",
		                    canNotQuoteBody: "Код цитаты помещен в буфер обмена, Вы можете использовать его в другом канале. Также Вы можете воспользоватся комбинацией клавиш Ctrl+Shift+C, чтобы скопировать цытату выделеного текста.",
		                },
		                'uk': {
		                    quoteContextMenuItem: "Цитувати",
		                    quoteTooltip: "Цитувати",
		                    attachment: "Додаток",
		                    canNotQuoteHeader: "Ви не можете цитувати в цей канал",
		                    canNotQuoteBody: "Код цитити поміщений до буферу обміну, Ви можете використати його в іншому каналі. Також ви можете скористатися комбінацію клавиш Ctrl+Shift+C, щоб скопіювати цитату виділеного тексту.",
		                },
		                'en-US': {
		                    quoteContextMenuItem: "Quote",
		                    quoteTooltip: "Quote",
		                    attachment: "Attachment",
		                    canNotQuoteHeader: "You can not quote into this channel",
		                    canNotQuoteBody: "Quotation code placed into clipboard, you can use it in other channel. Also you can use Ctrl+Shift+C shortcut to copy quote of selected text.",
		                },
		                'de': {
		                    quoteContextMenuItem: "Zitieren",
		                    quoteTooltip: "Zitieren",
		                    attachment: "Anhang",
		                    canNotQuoteHeader: "Du kannst in diesem Channel nicht zitieren.",
		                    canNotQuoteBody: "Der Zitierungscode wurde in die Zwischenablage gespeichert, du kannst ihn in einem anderen Channel benutzen. Du kannst auch den Shortcut STRG+Shift+C benutzen um den Zitierungscode zu kopieren.",
		                }
		            }
		        }
	
		        get L() {
		            return new Proxy(this.locales, {
		                get(locales, property) {
		                    return locales[UserSettingsStore.locale] && locales[UserSettingsStore.locale][property] || locales['en-US'][property]
		                }
		            });
		        }
		    }
	
		    window.jQuery = $;
		    return QuoterPlugin;
		};
	
	
	/***/ })
	/******/ ]);

/*@end @*/  

