import { input } from "@inquirer/prompts";
import { sleep } from "../utils/sleep.js";
import { composeDeck } from "../factory/deckFactory.js";
import { Player } from "../models/player.js";
import { Dealer } from "../models/dealer.js";
import { Game } from "../models/game.js";
import { playerLog } from "../utils/console.js";

export const initGame = async (): Promise<Game> => {
    playerLog('Welcome to Blackjack');
    sleep(1000);

    const playerName = await input({ message: 'Enter your name' });

    sleep(1000);

    playerLog(`Hi ${playerName}, you have £100 to play with. Each bet is £10. Let's get started`)


    const deck = composeDeck();
    const player = new Player(playerName, 100);
    const dealer = new Dealer();

    return new Game([player, dealer], deck);
}