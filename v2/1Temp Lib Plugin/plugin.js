module.exports = (Plugin) => {

    const monkeyPatch = (what, methodName, {before, after, instead, silent = false, displayName, once = false}) => {
        displayName = displayName || what.displayName || what.name || what.constructor.displayName || what.constructor.name;
        if (!silent) console.log('patch', methodName, 'of', displayName);
        const origMethod = what[methodName];
        const cancel = () => {
            if (!silent) console.log('unpatch', methodName, 'of', displayName);
            what[methodName] = origMethod;
        };
        what[methodName] = function() {
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

        const modulesFactories = webpackJsonp([], {
            '__extra_id__': (module, exports, req) => {
                exports.default = Object.values(req).find(f => f instanceof Array);
            }
        }, ['__extra_id__']).default;
        delete modulesFactories['__extra_id__'];

        const find = (filter) => {
            for (let i = 0; i < modulesFactories.length; ++i) {
                let m = webpackJsonp([], [], [i]);
                if (m && m.__esModule && m.default)
                    m = m.default;
                if (m && filter(m))
                    return m;
            }
            return null;
        };
        const findByUniqueProperties = (propNames) => find(module => propNames.every(prop => module[prop] != undefined))
        const findByDisplayName = (displayName) => find(module => module.displayName === displayName)

        return {find, findByUniqueProperties, findByDisplayName};

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
                    listners[name].forEach(f => f(component))
                    listners[name] = null;
                }
            }
        };
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
        const getAll = (...names) => Promise.all(names.map(name => get(name)));

        monkeyPatch(React, 'createElement', {
            displayName: 'React',
            before: ({methodArguments}) => {
                if (methodArguments[0].displayName) {
                    put(methodArguments[0]);
                }
            }
        });

        return {get, getAll};

    })();

    const getInternalInstance = e => e[Object.keys(e).find(k => k.startsWith("__reactInternalInstance"))];
    const getOwnerInstance = (e, {include, exclude = ["Popout", "Tooltip", "Scroller", "BackgroundFlash"]} = {}) => {
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

    window.DiscordInternals = {
        monkeyPatch,
        WebpackModules,
        ReactComponents,
        getInternalInstance,
        getOwnerInstance,
        React
    };


    class LibPlugin extends Plugin {
        onStart() {
            return false;
        }

        onStop() {
            return true;
        }
    }

    return LibPlugin;
};