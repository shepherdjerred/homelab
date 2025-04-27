import { LIB_HASS } from "@digital-alchemy/hass";
import { LIB_SYNAPSE } from "@digital-alchemy/synapse";
import { LIB_AUTOMATION } from "@digital-alchemy/automation";
import {
  CreateApplication,
  CronExpression,
  type TServiceParams,
} from "@digital-alchemy/core";

function goodMorning({ hass, scheduler, logger }: TServiceParams) {
  const wakeUpTime = hass.refBy.id("input_datetime.wake_up");
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const bedroomBrightScene = hass.refBy.id("scene.bedroom_bright");
  const openBedroomCovers = hass.refBy.id("script.open_bedroom_covers");
  const bathroomMediaPlayers = [
    hass.refBy.id("media_player.main_bathroom"),
  ];

  // TODO: use the schedule w/ cron expression
  wakeUpTime.onUpdate(async () => {
    logger.info("Good Morning automation triggered");

    // Turn on bedroom lights
    await bedroomScene.turn_on({ transition: 3 });

    // Play music
    await bedroomMediaPlayer.unjoin();
    await bedroomMediaPlayer.volume_set({ volume_level: 0 });
    await bedroomMediaPlayer.play_media({
      media_content_id: "FV:2/5",
      media_content_type: "favorite_item_id",
    });

    // Gradually increase volume
    for (let i = 0; i < 2; i++) {
      await bedroomMediaPlayer.volume_up();
      await scheduler.setTimeout(() => {}, 5000);
    }

    // Delay 15 minutes
    await scheduler.setTimeout(() => {}, 15 * 60 * 1000);

    // Open bedroom covers
    await openBedroomCovers.turn_on();

    // Turn on bedroom bright scene
    await bedroomBrightScene.turn_on({ transition: 60 });

    // Turn down volume before adding to group
    for (const player of bathroomMediaPlayers) {
      await player.volume_set({ volume_level: 0 });
    }

    // Add speakers to group
    await bedroomMediaPlayer.join({
      group_members: bathroomMediaPlayers.map((p) => p.entity_id),
    });

    // Gradually increase volume
    for (let i = 0; i < 3; i++) {
      // TODO: do this more gradually
      await bedroomMediaPlayer.volume_up();
      await scheduler.setTimeout(() => {}, 5000);
    }
  });
}

function goodNight(
  { hass, scheduler, logger, automation, context }: TServiceParams,
) {
  const bedroomScene = hass.refBy.id("scene.bedroom_dimmed");
  const bedroomMediaPlayer = hass.refBy.id("media_player.bedroom");
  const closeBedroomCovers = hass.refBy.id("script.close_bedroom_covers");
  const openLivingRoomCovers = hass.refBy.id(
    "script.open_all_living_room_tv_covers",
  );
  const bedroomLight = hass.refBy.id("light.bedroom");

  automation.sequence({
    context,
    event_type: "ios.action_fired",
    filter: ({ data: { actionID } }) => {
      return actionID === "A91A15AA-479E-416C-8F51-BD983A999266";
    },
    match: [],
    path: "good_night",
    exec: async () => {
      logger.info("Good Night automation triggered");

      // Dim bedroom lights if they are on
      if (bedroomLight.state === "on") {
        await bedroomScene.turn_on();
      }

      // Play rain sounds
      await bedroomMediaPlayer.unjoin();
      await bedroomMediaPlayer.volume_set({ volume_level: 0 });
      await bedroomMediaPlayer.play_media({
        media_content_id: "FV:2/7",
        media_content_type: "favorite_item_id",
      });

      // Gradually increase volume
      for (let i = 0; i < 5; i++) {
        await scheduler.setTimeout(() => {}, 5000);
        await bedroomMediaPlayer.volume_up();
      }

      // Close bedroom covers
      await closeBedroomCovers.turn_on();

      // Open all living room and TV covers
      await openLivingRoomCovers.turn_on();
    },
  });
}

function indoorLightsSunrise({ hass, logger, automation }: TServiceParams) {
  const livingRoomScene = hass.refBy.id("scene.living_room_dimmed");
  const openLivingRoomCovers = hass.refBy.id(
    "script.open_all_living_room_tv_covers",
  );

  automation.solar.onEvent({
    eventName: "sunrise",
    exec: async () => {
      logger.info(
        `Indoor lights (sunrise) automation`,
      );

      // Turn on living room dimmed scene
      await livingRoomScene.turn_on({ transition: 10 });

      // Open living room and TV covers
      await openLivingRoomCovers.turn_on();
    },
  });
}

function welcomeHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  personJerred.onUpdate(async (newState, oldState) => {
    if (newState.state === "home" && oldState.state !== "home") {
      logger.info("Welcome Home automation triggered");

      // Send Roomba home if not charging or docked
      if (
        roomba.attributes.status !== "Charging" &&
        roomba.attributes.status !== "Docked"
      ) {
        await roomba.return_to_base();
      }
    }
  });
}

function runVacuumIfNotHome({ hass, scheduler, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  scheduler.cron(
    {
      schedule: CronExpression.EVERY_DAY_AT_9AM,
      exec: async () => {
        logger.info("Run Vacuum if Not Home automation triggered");
        if (personJerred.state === "not_home" && roomba.state === "docked") {
          await roomba.start();
        }
      },
    },
  );
}

function leavingHome({ hass, logger }: TServiceParams) {
  const personJerred = hass.refBy.id("person.jerred");
  const roomba = hass.refBy.id("vacuum.roomba");

  personJerred.onUpdate(async (newState, oldState) => {
    if (newState.state === "not_home" && oldState.state !== "not_home") {
      logger.info("Leaving Home automation triggered");

      // Send Roomba home if not charging or docked
      if (
        roomba.attributes.status !== "Charging" &&
        roomba.attributes.status !== "Docked"
      ) {
        await roomba.return_to_base();
      }
    }
  });
}

function indoorLightsSunset({ hass, logger, automation }: TServiceParams) {
  const livingRoomScene = hass.refBy.id("scene.living_room_bright");
  const bedroomScene = hass.refBy.id("scene.bedroom_bright");
  const closeLivingRoomCovers = hass.refBy.id(
    "script.close_all_living_room_tv_covers",
  );
  const closeBedroomCovers = hass.refBy.id("script.close_bedroom_covers");

  automation.solar.onEvent({
    eventName: "sunset",
    exec: async () => {
      logger.info(
        `Indoor lights (sunset) automation`,
      );

      // Turn on living room bright scene
      await livingRoomScene.turn_on({ transition: 10 });

      // Turn on bedroom bright scene
      await bedroomScene.turn_on({ transition: 10 });

      // Close living room and TV covers
      await closeLivingRoomCovers.turn_on();

      // Close bedroom covers
      await closeBedroomCovers.turn_on();
    },
  });
}

const app = CreateApplication({
  libraries: [LIB_HASS, LIB_SYNAPSE, LIB_AUTOMATION],
  name: "automation",
  services: {
    goodMorning,
    goodNight,
    indoorLightsSunrise,
    welcomeHome,
    runVacuumIfNotHome,
    leavingHome,
    indoorLightsSunset,
  },
});

app.bootstrap();
