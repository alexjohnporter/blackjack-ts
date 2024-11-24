import { select } from "@inquirer/prompts";
import { Game } from "../models/game.js";
import chalk from "chalk";
import { dealerLog, playerLog } from "../utils/console.js";
import { Round } from "../models/round.js";
import { Player } from "../models/player.js";
import { Deck } from "../models/deck.js";
import { sleep } from "../utils/sleep.js";

const finishRound = (round: Round) => {
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
const handlePlayerHand = (player: Player, round: Round,): boolean => {
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
const handleDealerTurn = async (dealer: Player, deck: Deck, round: Round): Promise<void> => {
    dealerLog("It's the dealer's turn!");
    await sleep(1000);
    dealerLog(`Dealer has ${dealer.getHand().toHumanReadable()}`);
    await sleep(1000);

    while (dealer.getHand().getHandValue() <= 17) {
        await sleep(1000);

        dealerLog('Dealer twists');
        await sleep(1000);
        dealer.twist(deck.dealCard());
        dealerLog(`Dealer has ${dealer.getHand().toHumanReadable()}`);

        await sleep(1000);

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

export const playRound = async (game: Game): Promise<void> => {
    game.newRound();

    const player = game.getActivePlayer();
    const dealer = game.getDealer();
    const deck = game.getDeck();
    const round = game.getActiveRound();

    if (!round) {
        throw new Error('No active round');
    }

    let playerAction: 'stick' | 'twist' = 'twist';

    // Player's turn: Repeat until the player sticks, gets blackjack, or goes bust
    while (playerAction === 'twist') {
        await sleep(1000);
        playerAction = await stickOrTwist();

        if (playerAction === 'twist') {
            player.twist(deck.dealCard());

            if (handlePlayerHand(player, round)) {
                return;  // End player turn if bust or blackjack
            }
        }
    }

    // Dealer's turn
    await handleDealerTurn(dealer, deck, round);

    await sleep(1000);

    // Final comparison of dealer's and player's hands
    if (!dealer.getHand().isBust() && dealer.getHand().getHandValue() > player.getHand().getHandValue()) {
        dealerLog('Dealer wins');
    } else if (dealer.getHand().getHandValue() === player.getHand().getHandValue()) {
        playerLog('It\'s a tie!');
    } else {
        playerLog('You win!');
    }

    finishRound(round);
};