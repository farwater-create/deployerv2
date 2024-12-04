import { ButtonInteraction, ComponentType } from "discord.js";
import { client } from "../../graphql/client";
import { GET_USER } from "../../graphql/queries/farwaterUser";
import { handleApolloError } from "../../utils/handle-apollo-error";
import {
  getFullApplicationModal,
  getExistingUserModal,
} from "../../views/modals/minecraft-application";
import { getExistingUserConfirmation } from "../../views/messages/minecraft-application";

export const customId = "minecraft-application-start";

export async function execute(interaction: ButtonInteraction): Promise<void> {
  try {
    // Extract role ID from the message embed
    const message = await interaction.message.fetch();
    const embedFields = message.embeds[0].fields;
    const roleField = embedFields.find(field => field.name === "Role");
    const roleId = roleField?.value.match(/\d+/)?.[0];

    if (!roleId) {
      throw new Error("Could not extract role ID from application message");
    }

    // First check if user already exists
    const { data } = await client.query({
      query: GET_USER,
      variables: {
        filter: {
          discordId: interaction.user.id,
        },
      },
    });

    const existingUser = data?.farwaterUser;

    if (existingUser) {
      // User exists, show confirmation message
      const confirmationView = getExistingUserConfirmation({
        minecraftName: existingUser.minecraftName,
      });

      await interaction.reply({
        ...confirmationView,
        ephemeral: true,
      });

      // Set up collector for button response
      const filter = (i: ButtonInteraction | any) => {
        return (
          (i.customId === "confirm-existing-yes" || i.customId === "confirm-existing-no") &&
          i.user.id === interaction.user.id &&
          i.componentType === ComponentType.Button
        );
      };

      const collector = interaction.channel?.createMessageComponentCollector({
        filter,
        time: 60000,
        max: 1,
      });

      collector?.on("collect", async i => {
        if (i.customId === "confirm-existing-yes") {
          // Show modal with only reason field
          const modal = getExistingUserModal();
          await i.showModal(modal);
        } else {
          // Show full modal
          const modal = getFullApplicationModal();
          await i.showModal(modal);
        }
      });

      collector?.on("end", async collected => {
        if (collected.size === 0) {
          await interaction.editReply({
            content: "Application confirmation timed out. Please try again.",
            components: [],
            embeds: [],
          });
        }
      });
    } else {
      // No existing user, show full modal
      const modal = getFullApplicationModal();
      await interaction.showModal(modal);
    }
  } catch (error) {
    const errorMessage = handleApolloError({
      error,
      defaultMessage: "There was an error processing your application. Please try again later.",
      logPrefix: "Error in application button handler",
    });

    await interaction.reply({
      content: errorMessage,
      ephemeral: true,
    });
  }
}
