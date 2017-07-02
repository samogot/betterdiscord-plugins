This is temporary plugin, which works as library for other my plugins. It will be removed when this code will be included into BD itself (Jiiks promised to think about it)

If you are plugin developer - you can freely use it. You can see usage examples in [gist](https://gist.github.com/samogot/736dc6289c9fdb9d1f12aba253d530f5) of old version or in my plugins.

## Support server

There is [support server](https://discord.gg/MC5dJdE) for all my plugins including this one. If you have any questions, you can ask them there. Also, there will be important announcements about new versions, bug fixing, etc., in case you want to keep abreast of news

## Changelog

### 1.2
- Look through already rendered components on `ReactComponents` initialization
- Allow regex className selectors in `Renderer`
- Add windows plugin auto-installation fallback on executing js file, using [noodlebox](https://github.com/noodlebox/betterdiscord-plugins)'s code

### 1.1
- New `Renderer` lib for safe and transparent patching of render function 

### 1.0
- Initial version

## Installation

Likely you are using stable BetterDiscord version v1 (v0.2.81:**1.xxx**), so see [this instructions](../../v1#installation). You will need to install [`1lib_discord_internals.plugin.js`](https://betterdiscord.net/ghdl?url=https://github.com/samogot/betterdiscord-plugins/blob/master/v1/1lib_discord_internals.plugin.js) file. If you are on windows - just download and run it.

This plugin also supports alpha BetterDiscord version v2 for developers only. If you one of them, you do not need any instruction, but still there is [one](../README.md#installation).
