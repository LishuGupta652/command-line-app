#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

console.log(
  chalk.green(figlet.textSync("The Dark Night", { horizontalLayout: "full" }))
);

let playerName;

const sleep = (ms = 2000) => new Promise((resolve) => setTimeout(resolve, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    "Who wnats to play the Dark Night? \n"
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue("how to play")}
    I am a process of computer.
    If you get any question wrong, Darkness will ${chalk.bgRed("Increase")}
    So Get all the question right
  `);
}

async function askName() {
  const answer = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answer.player_name;
}

async function question1() {
  const answer = await inquirer.prompt({
    name: "question1",
    type: "list",
    message: "What is the name of the Dark Knight?",
    choices: ["Batman", "Superman", "Spiderman", "Wonder"],
  });

  return handleAnswer(answer.question1 == "Batman");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("The Dark in the night.. ").start();

  await sleep();

  if (isCorrect) {
    spinner.success({ text: "nice work ${playerName}" });
  } else {
    spinner.error({
      text: "Game over ${playerName}. You are now leaving the dark mowheel",
    });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const message = `Wohoo ${playerName}`;

  figlet(message, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await winner();
