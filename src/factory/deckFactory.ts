// import cards from '../cards.json' with { type: "json" };
import { Card, Suit } from '../models/card.js';
import { Deck } from '../models/deck.js';
import { readFile } from 'fs/promises';

const validSuits: Set<Suit> = new Set(['Diamonds', 'Hearts', 'Clubs', 'Spades']);

interface CardArrayItem {
    [suit: string]: string;
}

export function isSuit(suit: string): suit is Suit {
    return validSuits.has(suit as Suit);
}

export const loadCards = async (): Promise<CardArrayItem[]> => {
    const file = await readFile(new URL('../cards.json', import.meta.url), { encoding: 'utf8' });

    return JSON.parse(file).cards;
}

export const composeDeck = (cards: CardArrayItem[]): Deck => {
    const validCards = cards
        .filter(card => {
            if (!isSuit(card.suit)) {
                console.warn(`Invalid suit found: ${card.suit}. Skipping this card.`);
                return false;
            }
            return true;
        })
        .map((card) => new Card(card.suit as Suit, card.value));

    const deck = new Deck(validCards);

    deck.shuffle();

    return deck;
};