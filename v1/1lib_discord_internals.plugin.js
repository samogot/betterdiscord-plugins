//META{"name":"p_1lib_discord_internals"}*//

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

	var p_1lib_discord_internals =
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
	
		const v1transpile_version = 5;
	
		module.exports = class {
		    constructor() {
		        const config = __webpack_require__(2);
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
		                if (!window.bdPluginStorage) {
		                    return;
		                }
		                try {
		                    const loadSettings = bdPluginStorage.get(this.path, "settings");
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
		                    bdPluginStorage.set(this.path, "settings", reduced);
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
	
		        const plugin = __webpack_require__(8)(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
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
	/* 2 */
	/***/ (function(module, exports) {
	
		module.exports = {
			"info": {
				"name": "Lib Discord Internals",
				"authors": [
					"Samogot"
				],
				"version": "1.4",
				"description": "Discord Internals lib",
				"repository": "https://github.com/samogot/betterdiscord-plugins.git",
				"homepage": "https://github.com/samogot/betterdiscord-plugins/tree/master/v2/1LibDiscordInternals",
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
		         * If module is ES6 module and has default property, consider default first, otherwise - full module object.
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
		                    if (m && m.__esModule && m.default && filter(m.default))
		                        return m.default;
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
		                if (m && m.__esModule && m.default && filter(m.default))
		                    return m.default;
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

/*@end @*/  

