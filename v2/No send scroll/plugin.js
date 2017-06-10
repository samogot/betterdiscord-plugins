module.exports = (Plugin) => {

    class V2Plugin extends Plugin {

        onStart() {
            const {monkeyPatch, WebpackModules, ReactComponents} = window.DiscordInternals;

            ReactComponents.get('Messages', Messages => {
                this.cancelGlobalPatch = monkeyPatch(Messages.prototype, 'componentDidUpdate', {
                    instead: ({callOriginalMethod, thisObject}) => {
                        if (thisObject.state && thisObject.state.messages && !thisObject.state.messages.hasMoreAfter) {
                            thisObject.state.messages.hasMoreAfter = true;
                            callOriginalMethod();
                            thisObject.state.messages.hasMoreAfter = false;
                        }
                        else callOriginalMethod();
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