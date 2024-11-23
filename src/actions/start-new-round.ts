import { select } from "@inquirer/prompts";
import { Game } from "../models/game.js";
import { dealHands } from "./deal-hands.js";
import { playRound } from "./play-round.js";
import { playerLog } from "../utils/console.js";

export const startNewRound = async (game: Game, firstRound: boolean = true): Promise<void> => {
    if (!firstRound) {
        const playAgain = async () => await select({
            message: 'Do you want to play another round?',
            choices: [
                { name: 'Yes', value: true },
                { name: 'No', value: false },
            ],
        })

        const result = await playAgain();

        if (!result) {
            game.endGame();
            console.log('Cards left: ', game.getDeck().getCards().length);
            playerLog('Thanks for playing!');
            return;
        }
    }

    dealHands(game);
    await playRound(game);

    startNewRound(game, false);
}