const v1transpile_version = 1;

module.exports = class {
    constructor() {
        const config = require('./config.json');
        if (!window.v1transpile || window.v1transpile.version < v1transpile_version) {
            window.v1transpile = window.v1transpile || {};
            window.v1transpile.version = v1transpile_version;
            window.v1transpile.Plugin = window.v1transpile.Plugin || require('betterdiscord/client/plugins/plugin');
            window.v1transpile.PluginApi = window.v1transpile.PluginApi || require('betterdiscord/client/plugins/api');
            window.v1transpile.PluginStorage = window.v1transpile.PluginStorage || require('betterdiscord/client/plugins/storage');

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

        const plugin = require('./plugin')(window.v1transpile.Plugin, BD, window.v1transpile.Vendor, true);
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