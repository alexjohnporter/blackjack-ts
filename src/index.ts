#!/usr/bin/env node
import { input, select } from '@inquirer/prompts';
import { initGame } from './actions/init-game.js';
import { dealHands } from './actions/deal-hands.js';
import { playRound } from './actions/play-round.js';
import { playerLog } from './utils/console.js';
import { Game } from './models/game.js';


const startNewRound = async (game: Game, firstRound: boolean = true): Promise<void> => {
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
            await playerLog('Thanks for playing!');
            return;
        }
    }

    dealHands(game);
    await playRound(game);

    startNewRound(game, false);
}

const game = await initGame();
await startNewRound(game, true);