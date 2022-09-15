import dotenv from "dotenv";
dotenv.config();
import { SlashCommandBuilder, Routes } from "discord.js";
import { REST } from "@discordjs/rest";

const commands = [
	new SlashCommandBuilder()
		.setName("bored")
		.setDescription("Ideas when you are bored"),
	new SlashCommandBuilder()
		.setName("uppercase")
		.setDescription("Second letters are uppercase"),
	new SlashCommandBuilder()
		.setName("uppercaseoff")
		.setDescription("Uppercase off"),
	new SlashCommandBuilder().setName("bitcoin").setDescription("Bitcoin price"),
	new SlashCommandBuilder().setName("eth").setDescription("Eth price"),
	new SlashCommandBuilder()
		.setName("curry")
		.setDescription("Steph Curry stats"),
	new SlashCommandBuilder()
		.setName("jokes")
		.setDescription("Programming jokes"),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

rest
	.put(
		Routes.applicationGuildCommands(process.env.CLIENTID, process.env.GUILDID),
		{ body: commands }
	)
	.then((data) =>
		console.log(`Successfully registered ${data.length} application commands.`)
	)
	.catch(console.error);
