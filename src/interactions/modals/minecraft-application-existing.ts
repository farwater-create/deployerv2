import { ModalSubmitInteraction } from "discord.js";
import { client } from "../../graphql/client";
import { SUBMIT_EXISTING_USER_APPLICATION } from "../../graphql/mutations/minecraftApplication";
import { GET_USER } from "../../graphql/queries/farwaterUser";
import { handleApolloError } from "../../utils/handle-apollo-error";

export const customId = "minecraft-application-modal-existing";

export const execute = async (interaction: ModalSubmitInteraction) => {
  try {
    await interaction.deferReply({ ephemeral: true });

    // Get the role ID from the message embed
    const message = await interaction.message?.fetch();
    if (!message?.embeds[0]) {
      throw new Error("Could not find application message");
    }

    const embedFields = message.embeds[0].fields;
    const roleField = embedFields.find(field => field.name === "Role");
    if (!roleField) {
      throw new Error("Could not find role field in application message");
    }

    // Extract role ID from mention format (<@&123456789>)
    const roleId = roleField.value.match(/\d+/)?.[0];
    if (!roleId) {
      throw new Error("Could not extract role ID from application message");
    }

    // Get existing user data
    const { data: userData } = await client.query({
      query: GET_USER,
      variables: {
        filter: {
          discordId: interaction.user.id,
        },
      },
    });

    const existingUser = userData?.farwaterUser;
    if (!existingUser) {
      throw new Error("Could not find existing user data");
    }

    const reason = interaction.fields.getTextInputValue("reason");

    const input = {
      discordId: interaction.user.id,
      reason,
      roleId,
    };

    console.log("Submitting existing user application with input:", input);
    const { data } = await client.mutate({
      mutation: SUBMIT_EXISTING_USER_APPLICATION,
      variables: { input },
    });

    if (data?.submitExistingUserApplication) {
      await interaction.editReply({
        content: "Your application has been submitted successfully! We will review it shortly.",
      });
    } else {
      throw new Error("Failed to submit application");
    }
  } catch (error) {
    const errorMessage = handleApolloError({
      error,
      defaultMessage: "There was an error submitting your application. Please try again later.",
      logPrefix: "Error submitting existing user application",
    });

    if (!interaction.replied && !interaction.deferred) {
      await interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
    } else {
      await interaction.editReply({
        content: errorMessage,
      });
    }
  }
};
