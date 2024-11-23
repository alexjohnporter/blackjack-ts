import { expect, test, describe } from '@jest/globals';


import { Card } from "./card.js";

describe('Card class', () => {
    test('it creates a valid card with number', () => {
        const card = new Card('Clubs', '8');
        expect(card).toBeInstanceOf(Card);
        expect(card.getValue()).toBe('8');
        expect(card.getNumberValue()).toBe(8);
        expect(card.isAce()).toBeFalsy();
        expect(card.toHumanReadable()).toBe('8 of Clubs');

    });

    test('it creates a valid card with ace', () => {
        const card = new Card('Clubs', 'Ace');
        expect(card).toBeInstanceOf(Card);
        expect(card.getSuit()).toBe('Clubs');
        expect(card.getValue()).toBe('Ace');
        expect(card.getNumberValue()).toBe(11);
        expect(card.isAce()).toBeTruthy();
        expect(card.toHumanReadable()).toBe('Ace of Clubs');
    });

    test('it creates a valid card with face card', () => {
        const card = new Card('Clubs', 'King');
        expect(card).toBeInstanceOf(Card);
        expect(card.getSuit()).toBe('Clubs');
        expect(card.getValue()).toBe('King');
        expect(card.getNumberValue()).toBe(10);
        expect(card.isAce()).toBeFalsy();
        expect(card.toHumanReadable()).toBe('King of Clubs');
    });
});


