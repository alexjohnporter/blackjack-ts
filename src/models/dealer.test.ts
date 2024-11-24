import { expect, test, describe } from '@jest/globals';
import { Player } from './player.js';
import { Card } from './card.js';
import { Hand } from './hand.js';
import { Dealer } from './dealer.js';

describe('Dealer class', () => {
    test('it creates a new dealer', () => {
        const dealer = new Dealer();
        expect(dealer).toBeInstanceOf(Player);
        expect(dealer.isDealer()).toBeTruthy();
        expect(dealer.getHand()).toEqual(new Hand(null));
    });

    test('it deals a hand and clears it', () => {
        const cards = [
            new Card('Clubs', '8'),
            new Card('Hearts', '2')
        ];

        const dealer = new Dealer();
        dealer.dealHand(cards);

        const expectedHand = new Hand(cards);

        expect(dealer.getHand()).toEqual(expectedHand);

        dealer.clearHand()

        expect(dealer.getHand()).toEqual(new Hand(null));
    });

    test('dealer can twist', () => {
        const cards = [
            new Card('Clubs', '8'),
            new Card('Hearts', '2')
        ];

        const dealer = new Dealer();
        dealer.dealHand(cards);

        const expectedHand = new Hand(cards);

        expect(dealer.getHand()).toEqual(expectedHand);

        dealer.twist(new Card('Spades', 'King'));
        expectedHand.addCard(new Card('Spades', 'King'));

        expect(dealer.getHand()).toEqual(expectedHand);
    });
});