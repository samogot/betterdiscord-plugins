This is temporary plugin, which works as library for other my plugins. It will be removed when this code will be included into BD itself (Jiiks promised to think about it)

If you are plugin developer - you can freely use it. You can see usage examples in [gist](https://gist.github.com/samogot/736dc6289c9fdb9d1f12aba253d530f5) of old version or in my plugins.

## Installation

Likely you are using stable BetterDiscord version v1 (v0.2.81:**1.xxx**), so see [this instructions](../../v1#installation). You will need to download and install [`1lib_discord_internals.plugin.js`](https://betterdiscord.net/ghdl?url=https://github.com/samogot/betterdiscord-plugins/blob/master/v1/1lib_discord_internals.plugin.js) file. If you are on windows - just run it.

This plugin also supports alpha BetterDiscord version v2 for developers only. If you one of them, you do not need any instruction, but still there is [one](../README.md#installation).

It's important to not rename plugin file or folder. Name started from `1` guarantees that this plugin will be loaded first. 

You do not have to enable this plugin. It have no active features, and it's enough to be placed into plugin directory, so other plugins can find it.

## Support server

There is [support server](https://discord.gg/MC5dJdE) for all my plugins including this one. If you have any questions, you can ask them there. Also, there will be important announcements about new versions, bug fixing, etc., in case you want to keep abreast of news

## Changelog

### 1.7
- Fix WebpackModules.find for uncached searches

### 1.6
- Fix lib for React.js 16
- Add option to request ReactComponents by filter and set names for them.
- BREAKING CHANGE: Change interface of ReactComponents.getAll, to allow syncronous callback

### 1.5
- Set `cacheOnly` option of `WebpackModules.find` as `true` by default, to prevent Chinese timestamp leaking on discord updates 

### 1.4
- Add `cacheOnly` option to `WebpackModules.find`
- Check filter in `WebpackModules.find` both for module itself and for ES6 `default` property

### 1.3
- Rename plugin from Temp Lib Plugin to Lib Discord Internals
- Add docs to public functions
- Update already rendered components on canceling rendering patch or methods rebinding patch
- Make doOnEachComponent return promise
- Expose version number and add version comparator so version guard can be implemented.

### 1.2
- Look through already rendered components on `ReactComponents` initialization
- Allow regex className selectors in `Renderer`
- Add windows plugin auto-installation fallback on executing js file, using [noodlebox](https://github.com/noodlebox/betterdiscord-plugins)'s code

### 1.1
- New `Renderer` lib for safe and transparent patching of render function 

### 1.0
- Initial version

## Thanks
- Thanks to Noodlebox for [inspiration](https://gist.github.com/noodlebox/047a9f57a8a714d88ca4a60672a22c81) and for contribution.
