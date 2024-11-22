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

    doesHandContainAce(): boolean {
        return false;
    }

    isBust(): boolean {
        return this.getHandValue() >= 22;
    }

    isBlackJack(): boolean {
        return this.getHandValue() === 21;
    }

    addCard(card: Card) {
        this.cards?.push(card);
    }

    showFirstCard(): Card {
        if (!this.cards) {
            throw new Error('No cards in hand');
        }

        return this.cards[0];
    }

    toHumanReadable(): string {
        return `${this.cards?.map(card => card.toHumanReadable()).join(', ')} for a total value of ${this.getHandValue()}`;
    }
}