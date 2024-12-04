import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";

export interface ExistingUserData {
  minecraftName: string;
}

export const getExistingUserConfirmation = (userData: ExistingUserData) => {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle("Existing Account Found")
    .setDescription(
      `We found an existing Minecraft account linked to your Discord. Is this still you?`,
    )
    .addFields({
      name: "Minecraft Username",
      value: userData.minecraftName || "Unknown",
      inline: true,
    })
    .setThumbnail(`https://mc-heads.net/avatar/${userData.minecraftName}`)
    .setImage(`https://mc-heads.net/body/${userData.minecraftName}`);

  const yesButton = new ButtonBuilder()
    .setCustomId("confirm-existing-yes")
    .setLabel("Yes, that's me")
    .setStyle(ButtonStyle.Success);

  const noButton = new ButtonBuilder()
    .setCustomId("confirm-existing-no")
    .setLabel("No, I want to update")
    .setStyle(ButtonStyle.Danger);

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(yesButton, noButton);

  return {
    embeds: [embed],
    components: [row],
  };
};
