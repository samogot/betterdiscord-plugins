const v1transpile_version = 4;

module.exports = class {
    constructor() {
        const config = require('./config.json');
        if (!window.v1transpile || window.v1transpile.version < v1transpile_version) {
            window.v1transpile = window.v1transpile || {};
            window.v1transpile.version = v1transpile_version;
            window.v1transpile.Plugin = window.v1transpile.Plugin || require('betterdiscord/src/client/plugins/plugin');
            window.v1transpile.PluginApi = window.v1transpile.PluginApi || require('betterdiscord/src/client/plugins/api');
            window.v1transpile.PluginStorage = window.v1transpile.PluginStorage || require('betterdiscord/src/client/plugins/storage');
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
                if (!window.bdPluginStorage) {
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
        const Settings = window.v1transpile.Settings;

        const panel = Settings.topPanel();
        const filterControls = Settings.controlGroups().appendTo(panel);

        const Control = Settings.controlGroup({label: this.pluginInstance.name + " settings"})
            .appendTo(filterControls);
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
                            this.pluginInstance.storage.save();
                            this.pluginInstance.onStop();
                            this.pluginInstance.onStart();
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
                            this.pluginInstance.storage.save();
                            this.pluginInstance.onStop();
                            this.pluginInstance.onStart();
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