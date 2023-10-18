import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { injectable } from 'inversify';
import Command from '.';
import fetch from 'node-fetch';
import { Resp } from './interfaces/bravery';

// This should be gotten form a dd datadragon API
const champnbrs = [266, 103, 84, 166, 12, 32, 34, 1, 523, 22, 136, 268, 432, 200, 53, 63, 201, 233, 51, 164, 69, 31, 42, 122, 131, 119, 36, 245, 60, 28, 81, 9, 114, 105, 3, 41, 86, 150, 79, 104, 887, 120, 74, 420, 39, 427, 40, 59, 24, 126, 202, 222, 145, 429, 43, 30, 38, 55, 10, 141, 85, 121, 203, 240, 96, 897, 7, 64, 89, 876, 127, 236, 117, 99, 54, 90, 57, 11, 902, 21, 62, 82, 25, 950, 267, 75, 111, 518, 76, 895, 56, 20, 2, 61, 516, 80, 78, 555, 246, 133, 497, 33, 421, 526, 888, 58, 107, 92, 68, 13, 360, 113, 235, 147, 875, 35, 98, 102, 27, 14, 15, 72, 37, 16, 50, 517, 134, 223, 163, 91, 44, 17, 412, 18, 48, 23, 4, 29, 77, 6, 110, 67, 45, 161, 711, 254, 234, 112, 8, 106, 19, 498, 101, 5, 157, 777, 83, 350, 154, 238, 221, 115, 26, 142, 143];

async function getBuild(champ: number, role: number) {
    const bod = {
        "map": 11,
        "level": 10,
        "roles": [
            role
        ],
        "language": "en",
        "champions": [
            champ
        ]
    };
    const customHeaders = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    return fetch("https://api2.ultimate-bravery.net/bo/api/ultimate-bravery/v1/classic/dataset", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(bod),
    })
        .then((response) => response.json())
        .then((data) => {
            const resp = data as Resp;
            return resp;
        });
}
function getRandomValueFormArray(array: any[]) {
    return array[Math.floor(Math.random() * array.length)];
}

@injectable()
export default class implements Command {
    public readonly slashCommand = new SlashCommandBuilder()
        .setName('brave')
        .setDescription('generate ultimate bravery build')
        .addNumberOption(option => option
            .setName("builds")
            .setDescription("max genereated builds")
            .setRequired(false)
            .setMaxValue(5));

    public requiresVC = false;

    public async execute(interaction: ChatInputCommandInteraction) {
        // inside a command, event listener, etc.

        let i = 0;
        const existingChampions: number[] = [];
        const maxBuilds = interaction.options.getNumber('builds') ?? 1;
        const embed = [];
        while (maxBuilds > i) {
            let champion = getRandomValueFormArray(champnbrs);
            while (existingChampions.includes(champion)) {
                champion = getRandomValueFormArray(champnbrs);
            }
            const response = await getBuild(champion, i) as Resp;
            existingChampions.push(champion)
            console.log(response);
            const summs: string = Object.keys(response.data.summonerSpells).join(", ");
            const items: string = Object.keys(response.data.items).join(", ");

            const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle(response.data.title)
                .setDescription(summs.toString())
                .addFields(
                    { name: response.data.role, value: response.data.champion.name },
                    { name: "Summoner spells", value: summs },
                    { name: "Items", value: items },
                    { name: "max first:", value: response.data.champion.spell.key + " aka " + response.data.champion.spell.name}
                )
                .setImage(response.data.champion.image);
            embed.push(exampleEmbed);
            i++;
        }
        await interaction.reply({ embeds: embed });
    }
}
