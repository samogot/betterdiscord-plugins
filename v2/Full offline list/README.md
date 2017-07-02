This is simple plugin for getting back offline users list on large servers. 
Just install it, restart/reload discord, and all servers would be marked as small, so offline user list will be shown. Be careful if you have really large servers with public channels - displaying offline list for them may be laggy.

## Known issues

1. Server which is opened by default on discord startup woun't be patched. I cannot fix it now. Just select any DM or friends list screen and press `Ctrl+R` to reload discord

## Support server

There is [support server](https://discord.gg/MC5dJdE) for all my plugins including this one. If you have any questions, you can ask them there. Also, there will be important announcements about new versions, bug fixing, etc., in case you want to keep abreast of news

## Changelog

### 1.1
- Add windows plugin auto-installation fallback on executing js file, using [noodlebox](https://github.com/noodlebox/betterdiscord-plugins)'s code. You should not update just for it.

### 1.0
- Initial version

## Installation

Likely you are using stable BetterDiscord version v1 (v0.2.81:**1.xxx**), so see [this instructions](../../v1#installation). You will need to install [`full_offline_list.plugin.js`](https://betterdiscord.net/ghdl?url=https://github.com/samogot/betterdiscord-plugins/blob/master/v1/full_offline_list.plugin.js) and [`1lib_discord_internals.plugin.js`](https://betterdiscord.net/ghdl?url=https://github.com/samogot/betterdiscord-plugins/blob/master/v1/1lib_discord_internals.plugin.js) files. If you are on windows - just download and run them.

This plugin also supports alpha BetterDiscord version v2 for developers only. If you one of them, you do not need any instruction, but still there is [one](../README.md#installation).

This plugin depends on [Lib Discord Internals](../1Lib%20Discord%20Internals) so install it too!
