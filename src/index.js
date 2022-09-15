import dotenv from "dotenv";
dotenv.config();
import fetch from "node-fetch";

import { Client, GatewayIntentBits } from "discord.js";
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMessageReactions,
	],
});

let setAnnoying = false;

client.once("ready", () => {
	try {
		client.user.setActivity("fetch");
		console.log("Connected");
	} catch (err) {
		console.log(err.message);
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	try {
		if (commandName === "curry") {
			const response = await fetch(
				"https://www.balldontlie.io/api/v1/season_averages?season=2021&player_ids[]=115"
			);
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			const data1 = await response.json();
			let stats = JSON.stringify(data1.data[0]);
			let clean = stats.replace(/"([^"]+)":/g, "$1:");
			clean = clean.replace(/[{}]/g, "");
			console.log(clean);
			await interaction.reply(clean);
			// for (let key in stats) {
			// 	if (stats.hasOwnProperty(key)) {
			// 		let test = key + "=" + stats[key];
			// 		console.log(test);
			// 		await interaction.reply(test);
			// 	}
			// }
		}
	} catch (err) {
		console.log(err.message);
		await interaction.reply("An error occurred");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	try {
		if (commandName === "uppercase") {
			setAnnoying = true;
			await interaction.reply("Uppercase on");
		} else if (commandName === "uppercaseoff") {
			setAnnoying = false;
			await interaction.reply("Uppercase off");
		}
	} catch (err) {
		console.log(err.message);
		await interaction.reply("An error occurred");
	}
});

client.on("messageCreate", (msg) => {
	if (msg.author.bot) return;
	try {
		if (setAnnoying) {
			let res = "";
			for (let i = 0; i < msg.content.length; i++) {
				res +=
					i % 2 == 0
						? msg.content.charAt(i).toUpperCase()
						: msg.content.charAt(i);
			}
			msg.reply(res);
		} else {
			return;
		}
	} catch (err) {
		console.log(err.message);
		msg.reply("An error occurred");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	try {
		if (commandName === "bored") {
			const response = await fetch("http://www.boredapi.com/api/activity/");
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			const data = await response.json();
			let idea = data.activity;
			console.log(idea);
			await interaction.reply(idea);
		}
	} catch (err) {
		console.log(err.message);
		await interaction.reply("An error occurred");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	try {
		if (commandName === "bitcoin") {
			const response1 = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
			);
			if (!response1.ok) {
				throw new Error("Something went wrong");
			}
			const data1 = await response1.json();
			let bitcoinPrice = data1.bitcoin.usd;
			console.log(bitcoinPrice);
			await interaction.reply("Bitcoin: $" + bitcoinPrice.toString());
		}
	} catch (err) {
		console.log(err.message);
		await interaction.reply("An error occurred");
	}
	try {
		if (commandName === "eth") {
			const response2 = await fetch(
				"https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
			);
			if (!response2.ok) {
				throw new Error("Something went wrong");
			}
			const data2 = await response2.json();
			let ethereumPrice = data2.ethereum.usd;
			console.log(ethereumPrice);
			await interaction.reply("Ethereum: $" + ethereumPrice.toString());
		}
	} catch (err) {
		console.log(err.message);
		await interaction.reply("An error occurred");
	}
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;
	const { commandName } = interaction;
	try {
		if (commandName === "jokes") {
			const response = await fetch(
				"https://backend-omega-seven.vercel.app/api/getjoke"
			);
			if (!response.ok) {
				throw new Error("Something went wrong");
			}
			const data = await response.json();
			let question = data[0].question;
			let answer = data[0].punchline;
			console.log(question);
			console.log(answer);
			await interaction.reply(question + answer);
		}
	} catch (err) {
		console.log(err.message);
		await interaction.reply("An error occurred");
	}
});

client.on("messageCreate", (msg) => {
	if (msg.author.bot) return;
	try {
		if (msg.content === "delete10") {
			msg.channel
				.bulkDelete(11)
				.then((messages) =>
					console.log(`Bulk deleted ${messages.size} messages`)
				)
				.catch(console.error);
		} else if (msg.content === "bearish") {
			msg.delete();
		}
	} catch (err) {
		console.log(err.message);
		msg.reply("An error occurred");
	}
});

client.on("messageCreate", (msg) => {
	if (msg.author.bot) return;
	try {
		if (msg.content === "bullish") {
			msg.react("🚀");
		}
	} catch (err) {
		console.log(err.message);
		msg.reply("An error occurred");
	}
});

client.login(process.env.TOKEN);
