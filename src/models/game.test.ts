import { expect, test, jest, describe, beforeEach } from '@jest/globals';

import { Game } from './game.js';
import { Player } from './player.js';
import { Dealer } from './dealer.js';
import { Deck } from './deck.js';
import { Round } from './round.js';
import { Card } from './card.js';
import { Hand } from './hand.js';
import { composeDeck, loadCards } from '../factory/deckFactory.js';

const getDeck = async (): Promise<Deck> => {
    const cards = await loadCards();
    return composeDeck(cards);
}

describe('Game class', () => {
    let players: Player[];
    let deck: Deck;

    beforeEach(async () => {
        // Mock the deck

        deck = await getDeck();

        // Create mock players
        players = [
            new Player('Player 1', 100),
            new Dealer(),
        ];

        // Mock player methods
        players.forEach(player => {
            player.clearHand = jest.fn();
            player.dealHand = jest.fn();
            player.isDealer = jest.fn(() => player instanceof Dealer);
        });
    });

    test('it creates a singleton instance', () => {
        const game1 = Game.getInstance(players, deck);
        const game2 = Game.getInstance(players, deck);

        expect(game1).toBe(game2); // Singleton behavior
        expect(game1.getPlayers()).toEqual(players);
        expect(game1.getDeck()).toBe(deck);
    });

    test('it deals hands to players', () => {
        const game = Game.getInstance(players, deck);

        game.dealHandsToPlayers();

        players.forEach(player => {
            expect(player.clearHand).toHaveBeenCalled();
            expect(player.dealHand).toHaveBeenCalledWith([
                new Card('Clubs', '8'),
                new Card('Hearts', 'King'),
            ]);
        });
    });

    test('it correctly identifies the dealer and active player', () => {
        const game = Game.getInstance(players, deck);

        const activePlayer = game.getActivePlayer();
        const dealer = game.getDealer();

        expect(activePlayer).toBe(players[0]);
        expect(dealer).toBeInstanceOf(Dealer);
    });

    test('it starts a new round', () => {
        const game = Game.getInstance(players, deck);

        // Mock Round methods
        const roundMock = new Round();
        roundMock.finishRound = jest.fn();
        game.getRounds().push(roundMock);

        game.newRound();

        // Ensure previous rounds are finished
        expect(roundMock.finishRound).toHaveBeenCalled();

        // Check that a new round is added
        expect(game.getRounds().length).toBe(2);
        expect(game.getRounds()[1]).toBeInstanceOf(Round);
    });

    test('it ends the current round', () => {
        const game = Game.getInstance(players, deck);

        const roundMock = new Round();
        roundMock.getStatus = jest.fn(() => 'Started');
        roundMock.finishRound = jest.fn();
        game.getRounds().push(roundMock);

        game.endCurrentRound();

        expect(roundMock.finishRound).toHaveBeenCalled();
    });

    test('it ends the game', () => {
        const game = Game.getInstance(players, deck);

        const roundMock = new Round();
        roundMock.getStatus = jest.fn(() => 'Started');
        roundMock.finishRound = jest.fn();
        game.getRounds().push(roundMock);

        game.endGame();

        expect(roundMock.finishRound).toHaveBeenCalled();
        expect(game.getStatus()).toBe('FINISHED');
    });

    test('it returns the active round or null', () => {
        const game = Game.getInstance(players, deck);

        const round1 = new Round();
        round1.getStatus = jest.fn(() => 'Finished');

        const round2 = new Round();
        round2.getStatus = jest.fn(() => 'Started');

        game.getRounds().push(round1, round2);

        expect(game.getActiveRound()).toBe(round2);

        // Simulate all rounds being finished
        round2.getStatus = jest.fn(() => 'Finished');
        expect(game.getActiveRound()).toBeNull();
    });
});