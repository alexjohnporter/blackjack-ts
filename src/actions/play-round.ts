import { select } from "@inquirer/prompts";
import { Game } from "../models/game.js";
import chalk from "chalk";
import { dealerLog, playerLog } from "../utils/console.js";

const finishRound = (round: any) => {
    round?.finishRound();
};

const stickOrTwist = async (): Promise<'stick' | 'twist'> => await select({
    message: 'Stick or Twist?',
    choices: [
        { name: 'Stick', value: 'stick' },
        { name: 'Twist', value: 'twist' },
    ],
});

// Check if the player's hand results in a bust or blackjack
const handlePlayerHand = (player: any, deck: any, round: any, game: Game): boolean => {
    playerLog(`you have ${player.getHand().toHumanReadable()}`);

    if (player.getHand().isBust()) {
        finishRound(round);
        console.log(chalk.bgRed('Uh oh, you are bust!'));
        return true;
    }

    if (player.getHand().isBlackJack()) {
        playerLog('Congratulation, you have BlackJack');
        finishRound(round);
        return true;
    }

    return false;
};

// Dealer's logic (twisting until hand value is > 17)
const handleDealerTurn = (dealer: any, deck: any, round: any): void => {
    dealerLog("It's the dealer's turn!");
    dealerLog(`Dealer has ${dealer.getHand().toHumanReadable()}`);

    while (dealer.getHand().getHandValue() <= 17) {
        dealerLog('Dealer twists');
        dealer.twist(deck.dealCard());
        dealerLog(`Dealer has ${dealer.getHand().toHumanReadable()}`);

        if (dealer.getHand().isBust()) {
            finishRound(round);
            dealerLog('Dealer is bust!');
            return;
        }

        if (dealer.getHand().isBlackJack()) {
            dealerLog('Dealer has blackjack - Dealer wins');
            finishRound(round);
            return;
        }
    }
};

export const playRound = async (game: Game): Promise<Game> => {
    game.newRound();

    const player = game.getActivePlayer();
    const dealer = game.getDealer();
    const deck = game.getDeck();
    const round = game.getActiveRound();

    const action = await stickOrTwist();

    if (action === 'twist') {
        player.twist(deck.dealCard());

        if (handlePlayerHand(player, deck, round, game)) {
            return game;
        }

        // Player hasn't bust or got blackjack, so continue the round
        return playRound(game);
    } else {
        handleDealerTurn(dealer, deck, round);
    }

    // Final comparison of dealer's and player's hands
    if (!dealer.getHand().isBust() && dealer.getHand().getHandValue() > player.getHand().getHandValue()) {
        dealerLog('Dealer wins');
        finishRound(round);
    } else {
        playerLog('You win! 123');
        finishRound(round);
    }

    return game;
};