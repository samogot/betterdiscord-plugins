This is plugin which introduce deep integrated quoting functionality into discord.

## Main features
- Quoting messages using rich embeds
- Quoting selected part of a message
- Quoting several messages at once
- Fallback to markdown formatted quotes when there is no permission to use embeds
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
    - In v2 default behaviour can be set in settings. In v1 default is `Ctrl+Click`
3. Use shortcut `Ctrl+Shift+C` to quote current selection into clipboard. Useful if you want to quote into different channel

## Changelog

### 3.0
- Brand new version of plugin

### 2.x
For older version see [this gist](https://gist.github.com/samogot/774d3d2059402d5173a72524e39dd7d0#file-readme-txt)

## Thanks
- Thanks to Jiiks for BetterDiscord
- Big thanks to Nirewen for inspiration to write new version using embeds and for some code (parsing) of his [Citador plugin](https://github.com/nirewen/Citador)
- Thanks to Hammock & Natsulus for their's [Replyer plugin](https://github.com/cosmicsalad/Discord-Themes-and-Plugins/blob/master/plugins/replyer.plugin.js) that was used as template for first version of my plugin

## Installation

See instructions for [v1](../../v1#installation) or [v2](../README.md#installation)
