import { Card } from "./card.js";

export class Hand {
    constructor(private cards: Card[] | null) { }

    getHandValue(): number {
        if (!this.cards) {
            return 0
        }

        let value = 0;
        for (let i = 0; i < this.cards.length; i++) {
            value += this.cards[i].getNumberValue();
        }

        return value;
    }

    isBust() {
        return this.getHandValue() >= 22;
    }
}