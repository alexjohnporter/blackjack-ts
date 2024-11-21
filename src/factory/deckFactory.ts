import cards from '../cards.json' with { type: "json" };
import { Card } from '../models/card.js';
import { Deck } from '../models/deck.js';

export const composeDeck = (): Deck => {
    const cardModels = cards.cards.map((card) => new Card(card.suit, card.value));

    return new Deck(cardModels);
}