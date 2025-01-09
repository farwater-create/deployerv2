import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } from "discord.js";

export const getFullApplicationModal = () => {
  const modal = new ModalBuilder()
    .setCustomId("minecraft-application-modal")
    .setTitle("Minecraft Application Form");

  const minecraftNameInput = new TextInputBuilder()
    .setCustomId("minecraft-name")
    .setLabel("Minecraft Username")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(3)
    .setMaxLength(16);

  const ageInput = new TextInputBuilder()
    .setCustomId("age")
    .setLabel("Your Age")
    .setStyle(TextInputStyle.Short)
    .setRequired(true)
    .setMinLength(1)
    .setMaxLength(2);

  const reasonInput = new TextInputBuilder()
    .setCustomId("reason")
    .setLabel("Why do you want to join?")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
    .setMinLength(50)
    .setMaxLength(1000);

  const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(minecraftNameInput);
  const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(ageInput);
  const thirdActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(reasonInput);

  modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);

  return modal;
};

export const getExistingUserModal = () => {
  const modal = new ModalBuilder()
    .setCustomId("minecraft-application-modal-existing")
    .setTitle("Application Update");

  const reasonInput = new TextInputBuilder()
    .setCustomId("reason")
    .setLabel("Why do you want to join?")
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true)
    .setMinLength(50)
    .setMaxLength(1000);

  const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(reasonInput);
  modal.addComponents(actionRow);

  return modal;
};
