import { select } from "@inquirer/prompts";
import { Game } from "../models/game.js";
import { dealHands } from "./deal-hands.js";
import { playRound } from "./play-round.js";
import { playerLog } from "../utils/console.js";
import { sleep } from "../utils/sleep.js";

export const startNewRound = async (game: Game, firstRound: boolean = true): Promise<void> => {
    await sleep(1000);

    if (!firstRound) {
        const playAgain = async () => await select({
            message: 'Do you want to play another round?',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false },
            ],
        })

        const result = await playAgain();
        await sleep(1000);


        if (!result) {

            game.endGame();
            console.log('Cards left: ', game.getDeck().getCards().length);
            playerLog('Thanks for playing!');
            return;
        }
    }

    await dealHands(game);
    await playRound(game);

    startNewRound(game, false);
}