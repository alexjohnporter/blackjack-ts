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

    dealHand(cards: Card[]) {
        // if (cards.length < 1) {
        //     throw new Error('No cards dealt');
        // }

        this.hand = new Hand(cards);
    }

    getHand(): Hand {
        return this.hand;
    }

    twist(card: Card) {
        this.hand.addCard(card);
    }
}