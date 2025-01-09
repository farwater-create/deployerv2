import { ModalSubmitInteraction } from "discord.js";
import { client } from "../../graphql/client";
import { SUBMIT_NEW_USER_APPLICATION } from "../../graphql/mutations/minecraftApplication";
import { handleApolloError } from "../../utils/handle-apollo-error";

export const customId = "minecraft-application-modal";

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

    const minecraftName = interaction.fields.getTextInputValue("minecraft-name");
    const age = interaction.fields.getTextInputValue("age");
    const reason = interaction.fields.getTextInputValue("reason");

    const input = {
      discordId: interaction.user.id,
      minecraftName,
      age: parseInt(age),
      reason,
      roleId,
    };

    console.log("Submitting application with input:", input);
    const { data } = await client.mutate({
      mutation: SUBMIT_NEW_USER_APPLICATION,
      variables: { input },
    });

    if (data?.submitNewUserApplication) {
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
      logPrefix: "Error submitting application",
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
