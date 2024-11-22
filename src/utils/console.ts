import chalk from "chalk";

export const playerLog = (text: string) => console.log(chalk.bgBlueBright(text));
export const dealerLog = (text: string) => console.log(chalk.bgYellowBright(text));