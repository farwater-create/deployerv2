import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChatInputCommandInteraction,
  CacheType,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { BaseCommand, IBaseCommand } from "../../classes/BaseCommand";

const TITLE = "🚀 Whitelist Application Process 📝";

const DESCRIPTION = `## Whitelist Application Process

Welcome to our Minecraft server discord whitelist application process! We're excited to have you join our community. To ensure a safe and fun environment for everyone, we have a simple application process. Here's how it works:

1. **Read the Server Rules**: Check out <#1020403465643638894> to get familiar with our server rules. It's important everyone follows these rules for a smooth and enjoyable experience.

2. **Review Process**: Our team will review your application. We’ll respond as quickly as possible.

3. **Notification**: If accepted, you’ll get a direct message from our bot <@1090949776159277106> with joining instructions.

4. **Get Started!**: Check out the new channels you now have access to for setup instructions and important details about the server.

Click the button below to get started!
`;

export class Command extends BaseCommand implements IBaseCommand {
  data = new SlashCommandBuilder()
    .setName("createapplication")
    .setDescription("Create a Minecraft application form")
    .addStringOption(option =>
      option.setName("serverid").setDescription("The ID of the server").setRequired(true),
    )
    .addRoleOption(option =>
      option.setName("role").setDescription("The role for the application").setRequired(true),
    );

  async execute(interaction: ChatInputCommandInteraction<CacheType>): Promise<void> {
    const serverId = interaction.options.getString("serverid", true);
    const role = interaction.options.getRole("role", true);

    const embed = new EmbedBuilder()
      .setTitle(TITLE)
      .setDescription(DESCRIPTION)
      .setThumbnail(
        "https://media.forgecdn.net/avatars/thumbnails/444/296/64/64/637698958460822126.png",
      )
      .addFields([
        {
          name: "Server ID",
          value: serverId,
        },
        {
          name: "Role",
          value: role.id,
        },
      ]);

    const button = new ButtonBuilder()
      .setCustomId("minecraft-application-start")
      .setLabel("Apply")
      .setStyle(ButtonStyle.Success);

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button);

    await interaction.reply({
      embeds: [embed],
      components: [row],
    });
  }
}
