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

    isBlackJack() {
        return this.getHandValue() === 21;
    }

    addCard(card: Card) {
        this.cards?.push(card);
    }

    toHumanReadable(): string {
        return `${this.cards?.map(card => card.toHumanReadable()).join(', ')} for a total value of ${this.getHandValue()}`;
    }
}