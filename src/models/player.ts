import { Card } from "./card.js";
import { Hand } from "./hand.js";

export class Player {
    private hand: Hand;

    constructor(
        private name: string,
        private pot: number
    ) {
        this.hand = new Hand(null);
    }

    dealHand(hand: Hand) {
        this.hand = hand;
    }

    getHand(): Hand {
        return this.hand;
    }
}