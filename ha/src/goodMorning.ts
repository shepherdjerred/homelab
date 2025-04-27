import type { TServiceParams } from "@digital-alchemy/core";

export function goodMorning({ hass, scheduler, logger }: TServiceParams) {
    const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
    const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
    const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
    const openBedroomCovers = hass.refBy.id("script.open_bedroom_covers");
    const bathroomMediaPlayers = [
        hass.refBy.id("media_player.main_bathroom"),
    ];

    scheduler.cron({
        schedule: "0 8 * * 1-5", // Every weekday at 8am
        exec: async () => {
            logger.info("Good Morning automation triggered for weekday");
            await run();
        },
    });

    scheduler.cron({
        schedule: "0 9 * * 6,0", // Every weekend at 9am
        exec: async () => {
            logger.info("Good Morning automation triggered for weekend");
            await run();
        },
    });

    async function run() {
        logger.info("Good Morning automation triggered");

        hass.call.notify.notify({
            title: "Good Morning",
            message: "Good Morning! Have a great day ahead.",
            data: {
                actions: [
                    {
                        action: "good_morning",
                        title: "Good Morning",
                        icon: "mdi:weather-sunny",
                    },
                ],
                push: {
                    sound: "default",
                },
                channel: "good_morning",
                sticky: true,
                color: "#FFD700",
            },
        });

        logger.debug("Turning on bedroom dimmed scene");
        await bedroomScene.turn_on({ transition: 3 });

        logger.debug("Unjoining bedroom media player");
        await bedroomMediaPlayer.unjoin();

        logger.debug("Setting bedroom media player volume to 0");
        await bedroomMediaPlayer.volume_set({ volume_level: 0 });

        logger.debug("Playing media on bedroom media player");
        await bedroomMediaPlayer.play_media({
            media_content_id: "FV:2/5",
            media_content_type: "favorite_item_id",
        });

        for (let i = 0; i < 2; i++) {
            logger.debug(
                `Increasing bedroom media player volume (step ${i + 1})`,
            );
            await bedroomMediaPlayer.volume_up();
            await scheduler.setTimeout(() => {}, 5000);
        }

        logger.debug("Waiting for 15 minutes before next actions");
        await scheduler.setTimeout(() => {}, 15 * 60 * 1000);

        logger.debug("Opening bedroom covers");
        await openBedroomCovers.turn_on();

        logger.debug("Turning on bedroom bright scene");
        await bedroomBrightScene.turn_on({ transition: 60 });

        for (const player of bathroomMediaPlayers) {
            logger.debug(`Setting volume to 0 for ${player.entity_id}`);
            await player.volume_set({ volume_level: 0 });
        }

        logger.debug("Joining bathroom media players to bedroom media player");
        await bedroomMediaPlayer.join({
            group_members: bathroomMediaPlayers.map((p) => p.entity_id),
        });

        for (let i = 0; i < 3; i++) {
            logger.debug(
                `Increasing bedroom media player volume (step ${i + 1})`,
            );
            await bedroomMediaPlayer.volume_up();
            await scheduler.setTimeout(() => {}, 5000);
        }
    }
}
