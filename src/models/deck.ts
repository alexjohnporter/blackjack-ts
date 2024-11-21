import { Card } from "./card.js";

export class Deck {
    constructor(private cards: Card[]) {
        if (cards.length > 52) throw Error('Too many cards in Deck')
    }

    getCards(): Card[] {
        return this.cards;
    }

    dealCard(): Card {
        const card = this.selectCardToDeal();
        this.removeCardFromDeck(card);

        return card;
    }

    private getRandomCardIndex(): number {
        return Math.floor(Math.random() * this.cards.length);
    }

    private selectCardToDeal(): Card {
        //handle undefined
        return this.cards[this.getRandomCardIndex()]
    }

    private removeCardFromDeck(usedCard: Card): void {
        this.cards = this.cards.filter(card => card.getId() !== usedCard.getId());
    }
}