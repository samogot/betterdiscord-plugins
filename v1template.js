module.exports = class {
    constructor() {
        const config = require('./config.json');
        const Plugin = require('betterdiscord/client/plugins/plugin');
        const PluginApi = require('betterdiscord/client/plugins/api');
        const PluginStorage = require('betterdiscord/client/plugins/storage');

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

        const plugin = require('./plugin')(Plugin, BD, Vendor, true);
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