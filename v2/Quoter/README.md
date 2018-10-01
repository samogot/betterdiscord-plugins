This is plugin which introduce deep integrated quoting functionality into discord.

## Installation. IMPORTANT! Do not try to install `plugin.js` file from list above unless you read instructions and know what to do.

Likely you are using stable BetterDiscord version v1 (v0.2.81:**1.xxx**). You will need to download and install [`quoter.plugin.js`](https://betterdiscord.net/ghdl?url=https://github.com/samogot/betterdiscord-plugins/blob/master/v1/quoter.plugin.js) and [`1lib_discord_internals.plugin.js`](https://betterdiscord.net/ghdl?url=https://github.com/samogot/betterdiscord-plugins/blob/master/v1/1lib_discord_internals.plugin.js) files. If you are on windows - just run them. For details, refer to [this instructions](../../v1#installation).

This plugin also supports alpha BetterDiscord version v2 for developers only. If you one of them, you do not need any instruction, but still there is [one](../README.md#installation).

This plugin depends on [Lib Discord Internals](../1Lib%20Discord%20Internals) so install it too!

## Main features
- Quoting messages using rich embeds
- Quoting selected part of a message
- Quoting several messages at once
- Fallback to markdown-formatted quotes when there is no permission to use embeds
- Jump to quoted message on click
- Requoting of selected quotes 
- Available locales: ru, uk, en, pt-BR, de

## How to use
There is several ways to quote:
1. Using message context menu - quote one message
2. Using new quote button near to message options and add reaction buttons
    - If any part of message is selected - full selection will be quoted 
    - Use `Alt+Click` to quote one message
    - Use `Ctrl+Click` to quote all messages to the end of message group
    - Use `Shift+Click` to quote all messages in message group
    - Default behaviour can be set in settings
3. Use shortcut `Ctrl+Shift+C` to quote current selection into clipboard. Useful if you want to quote into different channel

## Settings
- Try to use embeds if possible (default) or always use markdown-formatted fallback mode. Useful for people or servers who think that embeds = self-botting = evil.
- On fallback mode use UTC timestamps or your local time (default). May be useful for multinational servers.
- Should people whose messages are quoted be mentioned or not (default). In fallback mode mentions will be neatly placed in markdown formatting. In embeds mode (default one) mention will be explicitly placed in message box for you.
- Should the default behaviour of quote button described above be equal to `Ctrl+Click` (default) or to `Alt+Click`

## Roadmap
- Respect BetterDiscord 24h preference in fallback mode quoting, instead of own preference 
- Change quote behaviour for plugin users a bit - render timestamp as jump-link (instead of header) and add user popout and user context menu for quote author.
- *Maybe sometime in future*. Add rich UI to handle what will be quoted now. Similar as in Citador plugin

Contributions are welcomed!

## Support server

There is [support server](https://discord.gg/MC5dJdE) for all my plugins including this one. If you have any questions, you can ask them there. Also, there will be important announcements about new versions, bug fixing, etc., in case you want to keep abreast of news

## Changelog

### 3.14
- Use Discord's new builtin message links

### 3.13
- Fix loading issues
- Fix external link module search
- Add plugin to update system if exists

### 3.12
- Remove dependency on some selectors
- Improve adding `::quoteN::` to textarea using internals
- Fix duplicating context menu items
- Set `displayName` of MessageGroup through webpack modules
- Fix timestamps displaying improperly on quotes

### 3.11
- Fix quote button not appearing after Discord update
- Fix requotes not grabbing correct data

### 3.10
- Fix partial quoting. Message component don't have display name any more, so use setName instead (and new version of lib)
- Change default value of use embeds settings. Added disclaimer about selfbots, so admins of better discord server (and plugins repo) would be happy

### 3.9.1
- Hotfix for latest context menu changes

### 3.9
- Fix collision with spotify integration

### 3.8
- Fix selectors and url placement after discord update. Thanks to Zerebos.

### 3.7
- Fix quoter error on discord reloading
- Proper fix for closing discord window on clicking quote
- Add German translation. Thanks to MaxiHuHe04. Sorry for delay
- Fix button CSS styles

### 3.6.2
- Hotfix for closing discord window on clicking quote. Thanks to Inve1951

### 3.6.1
- Fix DM quoting (regression)

### 3.6
- Fix for React.js 16, including proper context menu handling
- Fix context menu not closed on clicking quote item

### 3.5
- Fix regression on discord update: no quote button, broken requoting and chinese timestamps
- Fix markdown interpretation of attachment file names
- Add option to use 12h or 24h format in fallback mode

### 3.4
- Fix crash on editing settings while plugin is disabled
- Fix error on posting messages with qotes index out of range (ex. `::quote999::`)
- If posting into channel is disabled - do not modify channels textarea.
- Fix textarea classname on canary
- Improve image quoting (there are still some issues on requoting)

### 3.3
- Support default avatars in embed quotes
- Add setting to force fallback mode on some servers
- Add error mesage to console if no LibDiscordInternals present
- Fix context menu item duplicating on settings changes

### 3.2
- Fix quoting selected text on windows
- Fix disappearing of first word on qouting selected code block in embeds mode
- Add new settings: to mention people whose messages are quoted and to always use fallback mode
- Add settings support to BDv1 version, using [noodlebox](https://github.com/noodlebox/betterdiscord-plugins)'s code
- Add windows plugin auto-installation fallback on executing js file, using [noodlebox](https://github.com/noodlebox/betterdiscord-plugins)'s code

### 3.1
- Rewrite UI using new Renderer lib

### 3.0
- Brand new version of plugin

### 2.x
For older version see [this gist](https://gist.github.com/samogot/774d3d2059402d5173a72524e39dd7d0#file-readme-txt)

## Thanks
- Thanks to Jiiks for BetterDiscord
- Big thanks to Nirewen for inspiration to write new version using embeds and for some code (parsing) of his [Citador plugin](https://github.com/nirewen/Citador)
- Thanks to Hammock & Natsulus for their's [Replyer plugin](https://github.com/cosmicsalad/Discord-Themes-and-Plugins/blob/master/plugins/replyer.plugin.js) that was used as template for first version of my plugin
- Thanks to romashko for hot-fixing Quoter v3.5.1
- Thanks to Inve1951 (square) for hot-fixing Quoter v3.6.2
- Thanks to rauenzi (Zerebos) for fixing Quoter v3.8
- Thanks to MaxiHuHe04 for german translation.
