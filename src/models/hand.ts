import { Card } from "./card.js";

export class Hand {
    constructor(private cards: Card[] | null) { }

    getHandValue(): number {
        if (!this.cards) {
            return 0;
        }

        let totalValue = 0;
        let aceCount = 0;

        // Calculate the initial value of the hand
        for (const card of this.cards) {
            const cardValue = card.getNumberValue();
            if (card.isAce()) {
                aceCount++;
                totalValue += 11; // Assume Ace is 11 initially
            } else {
                totalValue += cardValue;
            }
        }

        // Adjust for Aces if total value exceeds 21
        while (totalValue > 21 && aceCount > 0) {
            totalValue -= 10; // Change one Ace from 11 to 1
            aceCount--;
        }

        return totalValue;
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