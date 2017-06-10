module.exports = (Plugin) => {

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