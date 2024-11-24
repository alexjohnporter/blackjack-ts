import { Game } from "../models/game.js";
import { dealerLog, playerLog } from "../utils/console.js";
import { sleep } from "../utils/sleep.js";

export const dealHands = async (game: Game): void => {
    game.dealHandsToPlayers();
    const activePlayer = game.getActivePlayer();

    playerLog(`you have ${activePlayer.getHand().toHumanReadable()}`);

    await sleep(1000);
    dealerLog(`The dealer has a ${game.getDealer().getHand().showFirstCard().toHumanReadable()} and another card face down`)

    await sleep(1000);

}
