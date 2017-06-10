//META{"name":"p_quoter"}*//
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

	module.exports = class {
	    constructor() {
	        const config = __webpack_require__(16);
	        const Plugin = __webpack_require__(3);
	        const PluginApi = __webpack_require__(4);
	        const PluginStorage = __webpack_require__(7);

	        PluginApi.prototype.injectStyle = (id, css) => BdApi.injectCSS(id, css);
	        PluginApi.prototype.removeStyle = (id) => BdApi.clearCSS(id);

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
	        const Vendor = {
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

	        const plugin = __webpack_require__(17)(Plugin, BD, Vendor, true);
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
/* 16 */
/***/ (function(module, exports) {

	module.exports = {
		"info": {
			"name": "Quoter",
			"authors": [
				"Samogot"
			],
			"version": "3.0",
			"description": "Add citation using embeds",
			"repository": "https://github.com/samogot/betterdiscord-plugins.git",
			"homepage": "https://github.com/samogot/betterdiscord-plugins/tree/master/v2/Quoter",
			"reloadable": true
		},
		"defaultSettings": [
			{
				"id": "citeFull",
				"type": "bool",
				"text": "Cite full message group",
				"description": "Clicking on quote icon cause citing full message group instead of one message. Use Alt+Click to quote single message.",
				"value": true
			},
			{
				"id": "utc",
				"type": "bool",
				"text": "Use UTC TimeZone",
				"description": "Use UTC TimeZone to display time in fallback mode",
				"value": false
			}
		],
		"permissions": []
	};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = (Plugin, BD, Vendor, v1) => {

	    // TODO v1

	    const {Api, Storage} = BD;
	    let {$} = Vendor;
	    const {monkeyPatch, WebpackModules, ReactComponents, getOwnerInstance, React} = window.DiscordInternals;

	    const moment = WebpackModules.findByUniqueProperties(['parseZone']);

	    const Constants = WebpackModules.findByUniqueProperties(['Routes', 'ChannelTypes']);

	    const GuildsStore = WebpackModules.findByUniqueProperties(['getGuild']);
	    const UsersStore = WebpackModules.findByUniqueProperties(['getUser', 'getCurrentUser']);
	    const MembersStore = WebpackModules.findByUniqueProperties(['getNick']);
	    const UserSettingsStore = WebpackModules.findByUniqueProperties(['developerMode', 'locale']);

	    const MessageActions = WebpackModules.findByUniqueProperties(['jumpToMessage', '_sendMessage']);
	    const MessageQueue = WebpackModules.findByUniqueProperties(['enqueue']);
	    const MessageParser = WebpackModules.findByUniqueProperties(['createMessage', 'parse', 'unparse']);
	    const HistoryUtils = WebpackModules.findByUniqueProperties(['transitionTo', 'replaceWith', 'getHistory']);
	    const PermissionUtils = WebpackModules.findByUniqueProperties(['getChannelPermissions', 'can']);

	    const ContextMenuItemsGroup = WebpackModules.find(m => typeof m === "function" && m.length === 1 && m.toString().search(/className\s*:\s*["']item-group["']/) !== -1);
	    ContextMenuItemsGroup.displayName = 'ContextMenuItemsGroup';
	    const ContextMenuItem = WebpackModules.find(m => typeof m === "function" && m.length === 1 && m.toString().search(/\.label\b.*\.hint\b.*\.action\b/) !== -1);
	    ContextMenuItem.displayName = 'ContextMenuItem';
	    const ExternalLink = WebpackModules.find(m => typeof m === "function" && m.length === 1 && m.prototype && m.prototype.onClick && m.prototype.onClick.toString().search(/\.trusted\b/) !== -1);
	    ExternalLink.displayName = 'ExternalLink';

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
	            if (v1) this.reRenderEmbeds();
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

	        rebindMethods(component, methods) {
	            const cancel = monkeyPatch(component.prototype, 'render', {
	                silent: true,
	                before: ({thisObject}) => {
	                    for (let method of methods) {
	                        thisObject[method] = component.prototype[method].bind(thisObject)
	                    }
	                }
	            });
	            this.cancelPatches.push(cancel);
	        }

	        static getCurrentChannel() {
	            return getOwnerInstance($('.chat')[0], {include: ["Channel"]}).state.channel;
	        }

	        static getIdsFromLink(href) {
	            const regex = new RegExp('^' + BASE_JUMP_URL + '\\?guild_id=([^&]+)&channel_id=([^&]+)&message_id=([^&]+)$');
	            const match = regex.exec(href);
	            if (!match) return null;
	            return {
	                guild_id: match[1],
	                channel_id: match[2],
	                message_id: match[3],
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

	                this.rebindMethods(OptionPopout, ['handleRetry']);
	            });
	        }

	        patchRetrySendMessageFromContextMenu() {
	            const MessageResendItem = WebpackModules.findByDisplayName('MessageResendItem');
	            moment.locale(UserSettingsStore.locale);
	            const cancel = monkeyPatch(MessageResendItem.prototype, 'handleResendMessage', {
	                before: this.patchCallbackPassEmbedFromPropsToSendMessage
	            });
	            this.cancelPatches.push(cancel);

	            this.rebindMethods(MessageResendItem, ['handleResendMessage']);
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
	                instead: ({methodArguments: [channelId, message], originalMethod, thisObject}) => {
	                    const sendMessageDirrect = originalMethod.bind(thisObject, channelId);
	                    if (QuoterPlugin.getCurrentChannel().isPrivate() || PermissionUtils.can(0x4800, {channelId})) {
	                        this.splitMessageAndPassEmbeds(message, sendMessageDirrect);
	                    }
	                    else {
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
	                message.content += `\n*<@${message.embed.author.id}> - ${timestamp.format('YYYY-MM-DD HH:mm Z')}${message.embed.footer.text ? ' | ' + message.embed.footer.text : ''}*`;
	                message.content += `\n${'```'}${MessageParser.unparse(message.embed.description, channelId)}${'```'}`;
	                message.content = message.content.trim();
	                message.embed = null;
	            }
	            sendMessage(message);
	        }

	        splitMessageAndPassEmbeds(message, sendMessage) {
	            const regex = /([\S\s]*?)::(?:re:)?quote(\d+)(?:-(\d+))?::/g;
	            let match, lastIndex = 0;
	            const currChannel = QuoterPlugin.getCurrentChannel();
	            while (match = regex.exec(message.content)) {
	                lastIndex = match.index + match[0].length;
	                let text = match[1].trim() || ' ';
	                const embeds = [];
	                for (let i = +match[2]; i <= (+match[3] || +match[2]); ++i) {
	                    const quote = this.quotes[i - 1];
	                    if (embeds.length > 0 && embeds[embeds.length - 1].author.id === quote.message.author.id
	                        && (!embeds[embeds.length - 1].image || !quote.message.attachments.some(att => att.width))) {
	                        this.appendToEmbed(embeds[embeds.length - 1], quote);
	                    }
	                    else {
	                        embeds.push(this.parseNewEmbed(quote, currChannel));
	                    }
	                }
	                for (let embed of embeds) {
	                    sendMessage(Object.assign({}, message, {content: text, embed}));
	                    text = ' ';
	                }
	            }
	            if (lastIndex < message.content.length) {
	                sendMessage(Object.assign({}, message, {content: message.content.substr(lastIndex)}));
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
	                }
	                else {
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
	                        value: `${emoji} [${attachment.filename}](${attachment.url})`
	                    });
	                }
	            }
	        }

	        parseNewEmbed(quote, currChannel) {
	            const embed = {
	                author: {
	                    id: quote.message.author.id,
	                    name: quote.message.nick || quote.message.author.username,
	                    icon_url: quote.message.author.avatar_url || `https://cdn.discordapp.com/avatars/${quote.message.author.id}/${quote.message.author.avatar}.png?size=20`,
	                },
	                footer: {},
	                timestamp: quote.message.timestamp.toISOString(),
	                fields: [],
	                color: quote.message.colorString && Number(quote.message.colorString.replace('#', '0x')),
	                url: `${BASE_JUMP_URL}?guild_id=${quote.channel.guild_id || '@me'}&channel_id=${quote.channel.id}&message_id=${quote.message.id}`,
	                quoter: true
	            };
	            if (currChannel.id !== quote.channel.id) {
	                if (quote.channel.guild_id && quote.channel.guild_id !== '@me') {
	                    embed.footer.text = '#' + quote.channel.name;
	                    if (currChannel.guild_id !== quote.channel.guild_id) {
	                        embed.footer.text += ' | ' + GuildsStore.getGuild(quote.channel.guild_id).name
	                    }
	                }
	                else if (quote.channel.footer_text) {
	                    embed.footer.text = quote.channel.footer_text;
	                }
	                else {
	                    embed.footer.text = quote.channel.recipients
	                        .slice(0, 5)
	                        .map(id => currChannel.guild_id && MembersStore.getNick(currChannel.guild_id, id) || UsersStore.getUser(id).username)
	                        .concat(quote.channel.recipients.length > 5 ? '...' : [])
	                        .join(', ');
	                    if (quote.channel.name) {
	                        embed.footer.text = `${quote.channel.name} (${embed.footer.text})`;
	                    }
	                    else if (quote.channel.recipients.length === 1) {
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
	                const cancel = monkeyPatch(Embed.prototype, 'renderFooter', {
	                    after: ({thisObject, returnValue}) => {
	                        if (thisObject.props.timestamp) {
	                            const calendar = moment(thisObject.props.timestamp).locale(UserSettingsStore.locale).calendar();
	                            if (returnValue.props.children && returnValue.props.children[1]
	                                && returnValue.props.children[1].props && returnValue.props.children[1].props.children
	                                && returnValue.props.children[1].props.children[2]) {
	                                returnValue.props.children[1].props.children[2] = calendar;
	                            }
	                            else if (typeof returnValue.props.children === "string") {
	                                returnValue.props.children = calendar;
	                            }
	                        }
	                    }
	                });
	                this.cancelPatches.push(cancel);
	                this.rebindMethods(Embed, ['renderFooter']);
	            });

	        }

	        patchJumpLinkClick() {
	            const cancel = monkeyPatch(ExternalLink.prototype, 'onClick', {
	                instead: ({thisObject, callOriginalMethod, methodArguments: [e]}) => {
	                    let ids;
	                    if (thisObject.props.href && (ids = QuoterPlugin.getIdsFromLink(thisObject.props.href))) {
	                        HistoryUtils.transitionTo(Constants.Routes.MESSAGE(ids.guild_id, ids.channel_id, ids.message_id));
	                        e.preventDefault();
	                    }
	                    else callOriginalMethod();
	                }
	            });
	            this.cancelPatches.push(cancel);
	            this.rebindMethods(ExternalLink, ['onClick']);
	        }

	        reRenderEmbeds() {
	            $('.embed-rich').each((i, el) => getOwnerInstance(el).forceUpdate());
	            $('.embed-author-name').each((i, el) => getOwnerInstance(el).forceUpdate());
	        }

	        patchMessageRender() {
	            ReactComponents.get('Message', Message => {
	                const cancel = monkeyPatch(Message.prototype, 'render', {
	                    after: ({returnValue, thisObject}) => {
	                        const Tooltip = WebpackModules.findByDisplayName('Tooltip');
	                        if (returnValue.props && returnValue.props.children && returnValue.props.children[0] && returnValue.props.children[0].props) {
	                            let props = returnValue.props.children[0].props;
	                            if (props.className === "body" && props.children && props.children[1] && props.children[1].props)
	                                props = props.children[1].props;
	                            if (props.className === "message-text" && props.children instanceof Array)
	                                props.children.splice(2, 0, React.createElement(Tooltip, {text: this.L.quoteTooltip}, React.createElement("div", {
	                                    className: "btn-quote",
	                                    onClick: this.onQuoteMessageClick.bind(this, thisObject.props.channel, thisObject.props.message)
	                                })));
	                        }
	                    }
	                });
	                this.cancelPatches.push(cancel);
	                $('.message').each((i, el) => getOwnerInstance(el, {include: ["Message"]}).forceUpdate());
	            });
	            const anyMessageGroup = document.querySelector('.message-group');
	            if (anyMessageGroup) {
	                getOwnerInstance(anyMessageGroup, {include: ["MessageGroup"]}).forceUpdate();
	            }
	        }

	        patchMessageContextMenuRender() {
	            ReactComponents.get('MessageContextMenu', MessageContextMenu => {
	                const cancel = monkeyPatch(MessageContextMenu.prototype, 'render', {
	                    after: ({returnValue, thisObject}) => {
	                        const props = returnValue.props.children[0].props;
	                        props.children = [props.children, React.createElement(ContextMenuItem, {
	                            label: this.L.quoteContextMenuItem,
	                            hint: 'Ctrl+Shift+C',
	                            action: this.onQuoteMessageClick.bind(this, thisObject.props.channel, thisObject.props.message)
	                        })];
	                    }
	                });
	                this.cancelPatches.push(cancel);
	            });
	        }

	        // Listeners

	        onCopyKeyPressed(e) {
	            if (e.which === 67 && e.ctrlKey && e.shiftKey) {
	                e.preventDefault();
	                this.copyKeyPressed = true;
	                document.execCommand('copy');
	            }
	        }

	        onCopy(e) {
	            if (!this.copyKeyPressed) {
	                return;
	            }
	            this.copyKeyPressed = false;
	            e.preventDefault();
	            this.tryClearQuotes();
	            const text = this.quoteSelection(QuoterPlugin.getCurrentChannel());
	            if (text) {
	                e.originalEvent.clipboardData.setData('Text', text);
	            }
	        }

	        onQuoteMessageClick(channel, message, e) {
	            const {$channelTextarea, oldText} = this.tryClearQuotes();
	            const citeFull = this.getSetting('citeFull');

	            let newText;
	            if (QuoterPlugin.isMessageInSelection(message)) {
	                newText = this.quoteSelection(channel);
	            }
	            else if (e.ctrlKey || e.shiftKey || citeFull && !e.altKey) {
	                const group = QuoterPlugin.getMessageGroup(message);
	                if (e.shiftKey) {
	                    newText = this.quoteMessageGroup(channel, group);
	                }
	                else {
	                    newText = this.quoteMessageGroup(channel, group.slice(group.indexOf(message)));
	                }
	            }
	            else {
	                newText = this.quoteMessageGroup(channel, [message]);
	            }

	            if (newText) {
	                const text = !oldText ? newText : /\n\s*$/.test(oldText) ? oldText + newText : oldText + '\n' + newText;
	                $channelTextarea.val(text).focus()[0].dispatchEvent(new Event('input', {bubbles: true}));
	            }
	        }

	        // Quote Logic

	        tryClearQuotes() {
	            const $channelTextarea = $('.content .channel-textarea textarea');
	            const oldText = $channelTextarea.val();
	            if (!/::(?:re:)?quote\d+(?:-\d+)?::/.test(oldText)) {
	                this.quotes = [];
	            }
	            return {$channelTextarea, oldText};
	        }

	        static isMessageInSelection(message) {
	            const selection = window.getSelection();
	            if (selection.isCollapsed) return false;
	            const range = selection.getRangeAt(0);
	            return !range.collapsed && $('.message').is((i, element) => range.intersectsNode(element)
	                && getOwnerInstance(element, {include: ["Message"]}).props.message.id === message.id);
	        }

	        static getMessageGroup(message) {
	            const $messageGroups = $('.message-group').toArray();
	            for (let element of $messageGroups) {
	                const messages = getOwnerInstance(element, {include: ["MessageGroup"]}).props.messages;
	                if (messages.includes(message)) {
	                    return messages;
	                }
	            }
	            return [message];
	        }

	        quoteMessageGroup(channel, messages) {
	            let count = 0;
	            for (let message of messages) {
	                if ((message.quotedContent || message.content).trim() || message.attachments > 0) {
	                    ++count;
	                    this.quotes.push({text: message.quotedContent || message.content, message, channel});
	                }
	            }
	            if (count > 1) {
	                return `::quote${this.quotes.length - count + 1}-${this.quotes.length}::\n`;
	            }
	            else if (count === 1) {
	                return `::quote${this.quotes.length}::\n`;
	            }
	        }

	        quoteSelection(channel) {
	            const range = getSelection().getRangeAt(0);
	            const $clone = $(range.cloneContents());

	            const $markups = $('.markup:not(.embed-field-value)').filter((i, element) => range.intersectsNode(element));

	            if ($markups.length === 0) {
	                return '';
	            }

	            const quotes = [];
	            const $clonedMarkups = $clone.find('.markup:not(.embed-field-value)');

	            if ($markups.length === 1) {
	                const quote = QuoterPlugin.getQuoteFromMarkupElement(channel, $markups[0]);
	                if (quote) {
	                    quote.message.quotedContent = quote.text = QuoterPlugin.parseSelection(channel, $clonedMarkups.add($('<div>').append($clone)).first());
	                    quotes.push(quote);
	                }
	            }
	            else {
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
	                if (quote.text.trim() || quote.message.attachments > 0) {
	                    if (group.length === 0 || !group[0].re && !quote.re && $(quote.markup).closest('.message-group').is($(group[0].markup).closest('.message-group'))) {
	                        group.push(quote);
	                    }
	                    else {
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
	            $markup.find('.edited,.timestamp,.username-wrapper').detach();
	            $markup.html($markup.html().replace(/<\/?code( class="inline")?>/g, "`"));
	            $markup.html($markup.html().replace(/<\/?pre>/g, "```"));
	            $markup.html($markup.html().replace(/<\/?strong>/g, "**"));
	            $markup.html($markup.html().replace(/<\/?em>/g, "*"));
	            $markup.html($markup.html().replace(/<\/?s>/g, "~~"));
	            $markup.html($markup.html().replace(/<\/?u>/g, "__"));
	            return MessageParser.parse(channel, $markup.text()).content
	        }

	        static getQuoteFromMarkupElement(channel, markup) {
	            if ($(markup).closest('.embed').length > 0) {
	                const $embed = $(markup).closest('.embed-rich');
	                const $embedAuthorName = $embed.find('.embed-author-name');
	                if ($embed.length > 0 && $embedAuthorName.attr('href').indexOf(BASE_JUMP_URL) === 0) {
	                    const ids = QuoterPlugin.getIdsFromLink($embedAuthorName.attr('href'));
	                    const embed = getOwnerInstance($embed[0], {include: ["Embed"]}).props;
	                    const attachments = $embed.find('.embed-field-value a').map((i, e) => ({
	                        url: $(e).attr('href'),
	                        filename: $(e).text()
	                    }));
	                    if (embed.image) attachments.push(embed.image);
	                    return {
	                        re: true,
	                        message: {
	                            id: ids.message_id,
	                            author: {
	                                id: embed.author.icon_url.split('/')[4],
	                                username: '> ' + embed.author.name,
	                                avatar: embed.author.icon_url.split('/').pop().split('.')[0]
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
	            }
	            else {
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
	                .message-group .btn-quote {
	                    opacity: 0;
	                    -webkit-transition: opacity .2s ease;
	                    transition: opacity .2s ease;
	                    float: right;
	                    width: 16px;
	                    height: 16px;
	                    background-size: 16px 16px;
	                    cursor: pointer;
	                    user-select: none;
	                    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 25"><path fill="#99AAB5" d="M18 6.5c0-2 .7-3.5 2-4.7C21.3.6 23 0 25 0c2.5 0 4.4.8 6 2.4C32.2 4 33 6 33 8.8s-.4 5-1.3 7c-.8 1.8-1.8 3.4-3 4.7-1.2 1.2-2.5 2.2-3.8 3L21.4 25l-3.3-5.5c1.4-.6 2.5-1.4 3.5-2.6 1-1.4 1.5-2.7 1.6-4-1.3 0-2.6-.6-3.7-1.8-1-1.2-1.7-2.8-1.7-4.8zM.4 6.5c0-2 .6-3.5 2-4.7C3.6.6 5.4 0 7.4 0c2.3 0 4.3.8 5.7 2.4C14.7 4 15.5 6 15.5 8.8s-.5 5-1.3 7c-.7 1.8-1.7 3.4-3 4.7-1 1.2-2.3 2.2-3.6 3C6 24 5 24.5 4 25L.6 19.5C2 19 3.2 18 4 17c1-1.3 1.6-2.6 1.8-4-1.4 0-2.6-.5-3.8-1.7C1 10 .4 8.5.4 6.5z"/></svg>') 50% no-repeat;
	                    margin-right: 4px
	                }

	                .message-group .btn-quote:hover {
	                    opacity: 1 !important
	                }

	                .theme-dark .btn-quote {
	                    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 25"><path fill="#FFF" d="M18 6.5c0-2 .7-3.5 2-4.7C21.3.6 23 0 25 0c2.5 0 4.4.8 6 2.4C32.2 4 33 6 33 8.8s-.4 5-1.3 7c-.8 1.8-1.8 3.4-3 4.7-1.2 1.2-2.5 2.2-3.8 3L21.4 25l-3.3-5.5c1.4-.6 2.5-1.4 3.5-2.6 1-1.4 1.5-2.7 1.6-4-1.3 0-2.6-.6-3.7-1.8-1-1.2-1.7-2.8-1.7-4.8zM.4 6.5c0-2 .6-3.5 2-4.7C3.6.6 5.4 0 7.4 0c2.3 0 4.3.8 5.7 2.4C14.7 4 15.5 6 15.5 8.8s-.5 5-1.3 7c-.7 1.8-1.7 3.4-3 4.7-1 1.2-2.3 2.2-3.6 3C6 24 5 24.5 4 25L.6 19.5C2 19 3.2 18 4 17c1-1.3 1.6-2.6 1.8-4-1.4 0-2.6-.5-3.8-1.7C1 10 .4 8.5.4 6.5z"/></svg>')
	                }

	                .message-group .comment > div:hover .btn-quote, .message-group .system-message > div:hover .btn-quote {
	                    opacity: .4
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
	                },
	                'uk': {
	                    quoteContextMenuItem: "Цитувати",
	                    quoteTooltip: "Цитувати",
	                    attachment: "Додаток",
	                },
	                'en-US': {
	                    quoteContextMenuItem: "Quote",
	                    quoteTooltip: "Quote",
	                    attachment: "Attachment",
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