import { expect, test, describe } from '@jest/globals';
import { Player } from './player.js';
import { Card } from './card.js';
import { Hand } from './hand.js';

describe('Player class', () => {
    test('it creates a new player', () => {
        const player = new Player('Foo', 100);
        expect(player).toBeInstanceOf(Player);
        expect(player.isDealer()).toBeFalsy();
        expect(player.getHand()).toEqual(new Hand(null));
    });

    test('it deals a hand and clears it', () => {
        const cards = [
            new Card('Clubs', '8'),
            new Card('Hearts', '2')
        ];

        const player = new Player('Foo', 100);
        player.dealHand(cards);

        const expectedHand = new Hand(cards);

        expect(player.getHand()).toEqual(expectedHand);

        player.clearHand()

        expect(player.getHand()).toEqual(new Hand(null));
    });

    test('player can twist', () => {
        const cards = [
            new Card('Clubs', '8'),
            new Card('Hearts', '2')
        ];

        const player = new Player('Foo', 100);
        player.dealHand(cards);

        const expectedHand = new Hand(cards);

        expect(player.getHand()).toEqual(expectedHand);

        player.twist(new Card('Spades', 'King'));
        expectedHand.addCard(new Card('Spades', 'King'));

        expect(player.getHand()).toEqual(expectedHand);
    });

    test('it handles dealing an empty hand', () => {
        const player = new Player('Foo', 100);
        const expectedError = () => player.dealHand([]);
        expect(expectedError).toThrowError(Error);
    });
});