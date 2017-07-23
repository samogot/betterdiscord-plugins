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
            const {monkeyPatch, WebpackModules} = window.DiscordInternals;

            const GuildsStore = WebpackModules.findByUniqueProperties(['getGuild']);
            const GuildMembersStore = WebpackModules.findByUniqueProperties(['getMemberGroups']);


            this.cancelGlobalPatch = monkeyPatch(GuildMembersStore, 'getMemberGroups', {
                instead: ({callOriginalMethod}) => {
                    let guild, largeRealValue;
                    const cancelLocalPatch = monkeyPatch(GuildsStore, 'getGuild', {
                        silent: true,
                        after: ({returnValue}) => {
                            if (returnValue) {
                                guild = returnValue;
                                largeRealValue = guild.large;
                                guild.large = false;
                            }
                        }
                    });
                    callOriginalMethod();
                    cancelLocalPatch();
                    if (guild) {
                        guild.large = largeRealValue;
                    }
                }
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