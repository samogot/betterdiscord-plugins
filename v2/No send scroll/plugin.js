module.exports = (Plugin) => {

    class V2Plugin extends Plugin {

        onStart() {
            const {monkeyPatch, WebpackModules, ReactComponents} = window.DiscordInternals;
            const MessageActions = WebpackModules.findByUniqueProperties(['jumpToMessage', '_sendMessage']);

            ReactComponents.get('Messages', Messages => {
                this.cancelGlobalPatch = monkeyPatch(MessageActions, '_sendMessage', {
                    before: () => {
                        const cancel = monkeyPatch(Messages.prototype, 'componentDidUpdate', {
                            instead: ({callOriginalMethod, thisObject}) => {
                                if (thisObject.state && thisObject.state.messages && !thisObject.state.messages.hasMoreAfter && !thisObject.isAtBottom()) {
                                    thisObject.state.messages.hasMoreAfter = true;
                                    callOriginalMethod();
                                    thisObject.state.messages.hasMoreAfter = false;
                                }
                                else callOriginalMethod();
                            }
                        });
                        setTimeout(cancel, 1000);
                    }
                });
            });

            return true;
        }

        onStop() {
            this.cancelGlobalPatch();
            return true;
        }

    }

    return V2Plugin;
};