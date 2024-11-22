import chalk from "chalk";
import { Game } from "../models/game.js";
import { dealerLog, playerLog } from "../utils/console.js";

export const dealHands = (game: Game): Game => {
    game.dealHandsToPlayers();
    const activePlayer = game.getActivePlayer();

    playerLog(`you have ${activePlayer.getHand().toHumanReadable()}`);
    dealerLog(`The dealer has a ${game.getDealer().getHand().showFirstCard().toHumanReadable()} and another card face down`)

    return game;
}
