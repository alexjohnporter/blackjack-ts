import cards from '../cards.json' with { type: "json" };
import { Card, Suit } from '../models/card.js';
import { Deck } from '../models/deck.js';

const validSuits: Set<Suit> = new Set(['Diamonds', 'Hearts', 'Clubs', 'Spades']);

export function isSuit(suit: string): suit is Suit {
    return validSuits.has(suit as Suit);
}

export const composeDeck = (): Deck => {
    const validCards = cards.cards
        .filter((card): card is { suit: Suit; value: string } => {
            if (!isSuit(card.suit)) {
                console.warn(`Invalid suit found: ${card.suit}. Skipping this card.`);
                return false;
            }
            return true;
        })
        .map((card) => new Card(card.suit, card.value));

    const deck = new Deck(validCards);

    deck.shuffle();

    return deck;
};