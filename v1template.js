const config = require('./config.json');
const Plugin = require('betterdiscord/client/plugins/plugin');
const PluginApi = require('betterdiscord/client/plugins/api');
const PluginStorage = require('betterdiscord/client/plugins/storage');
const Vendor = require('betterdiscord/client/vendor');


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

const plugin = require('./plugin')(Plugin, BD, Vendor);
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