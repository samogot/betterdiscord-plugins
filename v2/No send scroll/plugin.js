module.exports = (Plugin, BD) => {

    const {Api} = BD;

    const minDIVersion = '1.0';
    if (!window.DiscordInternals) {
        const message = `Lib Discord Internals v${minDIVersion} or higher not found! Please install or upgrade that utility plugin. See install instructions here https://goo.gl/kQ7UMV`;
        Api.log(message, 'warn');
        return (class EmptyStubPlugin extends Plugin {
            onStart() {
                Api.log(message, 'warn');
                alert(message);
                return false;
            }

            onStop() {
                return true;
            }
        });
    }

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