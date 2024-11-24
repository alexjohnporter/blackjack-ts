import { expect, test, describe } from '@jest/globals';
import { Card } from './card.js';
import { Hand } from './hand.js';

describe('Hand class', () => {
    test('it should create a valid hand', () => {
        const cards = [
            new Card('Clubs', '8'),
            new Card('Hearts', '2')
        ];

        const hand = new Hand(cards);

        expect(hand).toBeInstanceOf(Hand);
        expect(hand.getHandValue()).toEqual(10);
        expect(hand.toHumanReadable()).toEqual('8 of Clubs, 2 of Hearts for a total value of 10');
        expect(hand.showFirstCard()).toEqual(cards[0]);
        expect(hand.isBlackJack()).toBeFalsy();
        expect(hand.isBust()).toBeFalsy();
        expect(new Hand(null)).toBeInstanceOf(Hand);
    });

    test('hand accounts for aces', () => {
        const cards = [
            new Card('Clubs', '4'),
            new Card('Hearts', 'Ace')
        ];

        const hand = new Hand(cards);
        expect(hand.getHandValue()).toEqual(15);

        hand.addCard(new Card('Clubs', 'King'));

        expect(hand.getHandValue()).toEqual(15);
    });

    test('it should be bust', () => {
        const cards = [
            new Card('Clubs', 'King'),
            new Card('Hearts', 'King')
        ];

        const hand = new Hand(cards);

        hand.addCard(new Card('Clubs', 'Queen'));

        expect(hand).toBeInstanceOf(Hand);
        expect(hand.getHandValue()).toEqual(30);
        expect(hand.toHumanReadable()).toEqual('King of Clubs, King of Hearts, Queen of Clubs for a total value of 30');
        expect(hand.isBust()).toBeTruthy();
    });

    test('it should be blackjack', () => {
        const cards = [
            new Card('Clubs', 'King'),
            new Card('Hearts', 'Ace')
        ];

        const hand = new Hand(cards);

        expect(hand).toBeInstanceOf(Hand);
        expect(hand.getHandValue()).toEqual(21);
        expect(hand.toHumanReadable()).toEqual('King of Clubs, Ace of Hearts for a total value of 21');
        expect(hand.isBlackJack()).toBeTruthy();
        expect(hand.isBust()).toBeFalsy();
    });
});