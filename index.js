#!/usr/bin/env node

import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import figlet from "figlet";
import gradient from "gradient-string";

let playerName;

const sleep = (ms = 2000) => new Promise(r => setTimeout(r, ms));

async function welcome() {
    const rainbowText = chalkAnimation.rainbow("Who wants to be Javascript Millionaire?");

    await sleep();
    rainbowText.stop();

    console.log(`
    ${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer. 
    If you get any questions wrong I will be ${chalk.bgRed('killed')}
    So get all the questions right!
    `);
}

async function askName() {
    const answers = await inquirer.prompt({
        name: "player_name",
        type: "input",
        message: "What is your name?",
        default() {
            return "Player";
        }
    })

    playerName = answers.player_name;
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner("Checking answers...");
    await sleep();

    if (isCorrect) {
        spinner.success({ text: `Nice work ${playerName}`});
    } else {
        spinner.error({text: `Game over, you lose ${playerName}`});
        process.exit(1);
    }
}

async function question1() {
    const answers = await inquirer.prompt({
        name: "question_1",
        type: "list",
        message: "Javascript was created on 10 days than released on",
        choices: [
            "May 23rd, 1995",
            "Nov 24th, 1995",
            "Dec 4th, 1995"
        ],
    });

    return handleAnswer(answers.question_1 == "Dec 4th, 1995");
}

function winner() {
    console.clear();
    const msg = `Congrats, \n ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`;

    figlet(msg,  (err, data) => {
        console.log(gradient.pastel.multiline(data));
        process.exit(0);
    });
}

await welcome();
await askName();
await question1();
winner();
