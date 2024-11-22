import { select } from "@inquirer/prompts";
import { Game } from "../models/game.js";
import chalk from "chalk";
import { dealerLog, playerLog } from "../utils/console.js";
import { dealHands } from "./deal-hands.js";

const stickOrTwist = async () => await select({
    message: 'Stick or Twist?',
    choices: [
        { name: 'Stick', value: 'stick' },
        { name: 'Twist', value: 'twist' },
        // { name: 'Split', value: 'split', disabled: true }
    ],
});

export const playRound = async (game: Game): Promise<Game> => {
    playerLog('Starting round');
    game.newRound()

    const player = game.getActivePlayer();
    const dealer = game.getDealer();
    const deck = game.getDeck();
    const round = game.getActiveRound();;

    const action = await stickOrTwist()

    if (action === 'twist') {
        player.twist(deck.dealCard());

        playerLog(`you have ${player.getHand().toHumanReadable()}`);

        if (player.getHand().isBust()) {
            round?.updateStatus('Finished')

            console.log(chalk.bgRed('Uh oh, you are bust!'));
            return game;
        }

        if (player.getHand().isBlackJack()) {
            playerLog('Congratulation, you have BlackJack');
            round?.updateStatus('Finished')
            return game;
        }

        await playRound(game);
    } else {
        dealerLog("It's the dealers turn!");
        dealerLog(`Dealer has ${dealer.getHand().toHumanReadable()}`);

        while (dealer.getHand().getHandValue() <= 17) {
            dealerLog('Dealer twists');
            dealer.twist(deck.dealCard());
            dealerLog(`Dealer has ${dealer.getHand().toHumanReadable()}`);

            if (dealer.getHand().isBust()) {
                round?.updateStatus('Finished')

                dealerLog('Dealer is bust!');
                playerLog('You win!');
                return game;
            }

            if (dealer.getHand().isBlackJack()) {
                //todo - account for scenario where dealer and player have blackjack
                dealerLog('Dealer has blackjack - Dealer wins');
                round?.updateStatus('Finished')
                return game;
            }
        }
    }

    if (dealer.getHand().getHandValue() > player.getHand().getHandValue()) {
        dealerLog('Dealer wins');
        round?.updateStatus('Finished')
    } else {
        playerLog('You win!');
        round?.updateStatus('Finished')
    }

    return game;
}