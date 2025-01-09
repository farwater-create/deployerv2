import {
  CacheType,
  ChatInputCommandInteraction,
  InteractionType,
  ButtonInteraction,
  ModalSubmitInteraction,
} from "discord.js";
import { DiscordClient } from "../classes/discord";
import * as minecraftApplication from "../interactions/buttons/minecraft-application";
import * as minecraftApplicationModal from "../interactions/modals/minecraft-application";

export const once = false;

export const execute = async (
  client: DiscordClient,
  interaction:
    | ChatInputCommandInteraction<CacheType>
    | ButtonInteraction<CacheType>
    | ModalSubmitInteraction<CacheType>,
) => {
  try {
    if (interaction.type === InteractionType.ApplicationCommand) {
      return client.commands.get(interaction.commandName)?.execute(interaction);
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case minecraftApplication.customId:
          await minecraftApplication.execute(interaction);
          break;
      }
    }

    if (interaction.isModalSubmit()) {
      switch (interaction.customId) {
        case minecraftApplicationModal.customId:
          await minecraftApplicationModal.execute(interaction);
          break;
      }
    }
  } catch (err) {
    console.error(err);
    await interaction
      .reply({ content: "There was an error processing your interaction!", ephemeral: true })
      .catch(() => {});
  }
};
