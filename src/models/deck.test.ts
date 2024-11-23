import { expect, test, describe } from '@jest/globals';
import { composeDeck, loadCards } from '../factory/deckFactory.js';
import { Deck } from './deck.js';
import { Card } from './card.js';

const getDeck = async (): Promise<Deck> => {
    const cards = await loadCards();
    return composeDeck(cards);
}

describe('Deck class', () => {
    test('it creates a valid deck', async () => {
        const deck = await getDeck();
        expect(deck).toBeInstanceOf(Deck);
    });

    test('it throws an error if card length > 52', async () => {
        const cards = await loadCards();
        const invalidDeck = () => composeDeck([
            ...cards,
            { suit: 'Clubs', value: 'Joker' }
        ]);

        expect(invalidDeck).toThrowError(Error);
    });

    test('it throws an error if card length < 52', async () => {
        const cards = await loadCards();
        cards.pop();
        const invalidDeck = () => composeDeck(cards);

        expect(invalidDeck).toThrowError(Error);
    });

    test('it deals a card then removes it from deck', async () => {
        const deck = await getDeck();
        const dealtCard = deck.dealCard();

        expect(dealtCard).toBeInstanceOf(Card);

        const shouldBeEmpty = deck.getCards().find(card => card.getId() === dealtCard.getId());

        expect(shouldBeEmpty).toBeUndefined();
    });

    test('it shuffles the cards', async () => {
        const deck = await getDeck();
        const originalCards = structuredClone(deck.getCards());

        deck.shuffle();

        expect(originalCards === deck.getCards()).toBeFalsy();
    });

});