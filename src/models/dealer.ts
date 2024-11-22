import { Player } from "./player.js";

export class Dealer extends Player {
    constructor() {
        super('Dealer', 10000000);
    }

    isDealer(): boolean {
        return true;
    }
}