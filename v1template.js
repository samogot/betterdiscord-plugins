/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you mistakenly tried to run me directly. (don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
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

const v1transpile_version = 2;

// Settings panel helpers

// Create and return a new top-level settings panel
function topPanel() {
	var panel = $("<form>")
		.addClass("form")
		.css("width", "100%");

	return panel;
}

// Create and return a container for control groups
function controlGroups() {
	return $("<div>").addClass("control-groups");
}

// Create and return a flexible control group
// settings (object)
//   label
//     an element or something JQuery-ish
//     or, if string, use as plain text
function controlGroup(settings) {
	var group = $("<div>").addClass("control-group");

	if (typeof settings.label === "string") {
		group.append($("<label>").text(settings.label));
	} else if (settings.label !== undefined) {
		group.append($("<label>").append(settings.label));
	}

	return group;
}

// Create and return a group of checkboxes
// settings (object)
//   items (array)
//     an array of settings objects to be passed to checkbox()
//   callback (function(state))
//     called with the current state, when it changes
//     state is an array of boolean values
function checkboxGroup(settings) {
	settings = $.extend({
		items: [],
		callback: $.noop,
	}, settings);

	var state = settings.items.map(item => item.checked === true);
	function onClick(i, itemState) {
		if (settings.items[i].callback !== undefined) {
			settings.items[i].callback(itemState);
		}
		state[i] = itemState;
		settings.callback(state);
	}

	var group = $("<ul>").addClass("checkbox-group");

	group.append(settings.items.map(function (item, i) {
		return checkbox($.extend({}, item, {
			callback: onClick.bind(undefined, i),
		}));
	}));

	return group;
}

// Create and return a checkbox
// settings (object)
//   label
//     an element or something JQuery-ish
//     or, if string, use as plain text
//   help
//     an element or something JQuery-ish
//     or, if string, use as plain text
//   checked (boolean)
//   disabled (boolean)
//   callback (function(state))
//     called with the current state, when it changes
//     state is a boolean
function checkbox(settings) {
	settings = $.extend({
		checked: false,
		disabled: false,
		callback: $.noop,
	}, settings);

	var input = $("<input>").attr("type", "checkbox")
		.prop("checked", settings.checked)
		.prop("disabled", settings.disabled);

	var inner = $("<div>").addClass("checkbox-inner")
		.append(input)
		.append($("<span>"));

	var outer = $("<div>").addClass("checkbox").append(inner);

	if (settings.disabled) {
		outer.addClass("disabled");
	}

	if (typeof settings.label === "string") {
		outer.append($("<span>").text(settings.label));
	} else if (settings.label !== undefined) {
		outer.append($("<span>").append(settings.label));
	}

	outer.on("click.kawaiiSettings", function () {
		if (!input.prop("disabled")) {
			var checked = !input.prop("checked");
			input.prop("checked", checked);
			settings.callback(checked);
		}
	});

	var item = $("<li>").append(outer);

	var help;
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

// End settings panel helpers

module.exports = class {
    constructor() {
        const config = require('./config.json');
        if (!window.v1transpile || window.v1transpile.version < v1transpile_version) {
            window.v1transpile = window.v1transpile || {};
            window.v1transpile.version = v1transpile_version;
            window.v1transpile.Plugin = window.v1transpile.Plugin || require('betterdiscord/src/client/plugins/plugin');
            window.v1transpile.PluginApi = window.v1transpile.PluginApi || require('betterdiscord/src/client/plugins/api');
            window.v1transpile.PluginStorage = window.v1transpile.PluginStorage || require('betterdiscord/src/client/plugins/storage');

            window.v1transpile.PluginApi.prototype.injectStyle = (id, css) => BdApi.injectCSS(id, css);
            window.v1transpile.PluginApi.prototype.removeStyle = (id) => BdApi.clearCSS(id);

			window.v1transpile.PluginStorage.prototype.load = function() {
				this.settings = JSON.parse(JSON.stringify(this.defaultConfig));
				if(!window.bdPluginStorage) {
					return;
				}
				this.path = this.path.replace('/settings.json', '');
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
				
				this.save();
			};
			
			window.v1transpile.PluginStorage.prototype.save = function() {
				const reduced = this.settings.reduce((result, item) => { result[item.id] = item.value; return result; }, {});
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

        const plugin = require('./plugin')(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
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
		
		var panel = topPanel();
		var filterControls = controlGroups().appendTo(panel);

		var Control = controlGroup({label: this.pluginInstance.name+" settings"})
			.appendTo(filterControls)
			.append(checkboxGroup({
				callback: state => {
					this.pluginInstance.storage.save();
					this.pluginInstance.onStop();
					this.pluginInstance.onStart();
				},
				items: this.pluginInstance.storage.settings.filter(item => item.type === "bool").map(item => ({
					label: item.text,
					help: item.description,
					checked: item.value,
					callback: state => this.pluginInstance.storage.setSetting(item.id, state),
				})),
			}));

		return panel[0];
	}
};