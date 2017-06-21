This is plugin which introduce deep integrated quoting functionality into discord.

## Main features
- Quoting messages using rich embeds
- Quoting selected part of a message
- Quoting several messages at once
- Fallback to markdown-formatted quotes when there is no permission to use embeds
- Jump to quoted message on click
- Requoting of selected quotes 
- Available locales: ru, uk, en, pt-BR

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
- Add setting for list of servers/channels where embeds are denyed and fallback mode should be used.
- Change quote behaviour for plugin users a bit - render timestamp as jump-link (instead of header) and add user popout and user context menu for quote author.
- *Maybe sometime in future*. Add rich UI to handle what will be quoted now. Similar as in Citador plugin

Contributions are welcomed!

## Changelog

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

## Installation

This plugin support both BetterDiscord versions. See installation instructions for [BDv1](../../v1#installation) or [BDv2](../README.md#installation).

This plugin depends on [Temp Lib Plugin](../1Temp%20Lib%20Plugin) so install it too!
