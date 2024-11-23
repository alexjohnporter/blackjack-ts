import { Card } from "./card.js";

export class Deck {
    constructor(private cards: Card[]) {
        if (cards.length < 52) throw Error('Too few cards in Deck');
        if (cards.length > 52) throw Error('Too many cards in Deck');
    }

    getCards(): Card[] {
        return this.cards;
    }

    dealCard(): Card {
        const card = this.selectCardToDeal();
        this.removeCardFromDeck(card);

        return card;
    }

    dealInitialCards(): Card[] {
        return [
            this.dealCard(),
            this.dealCard()
        ]
    }

    shuffle(): void {
        const cards = this.cards;
        let index = cards.length;
        let randomIndex;

        while (index !== 0) {
            randomIndex = Math.floor(Math.random() * index);
            index--;

            [cards[index], cards[randomIndex]] = [cards[randomIndex], cards[index]];
        }
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