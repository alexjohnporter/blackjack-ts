import { expect, test, describe } from '@jest/globals';
import { Round } from './round.js';

describe('Round class', () => {
    test('it should start a round', () => {
        const round = new Round();
        expect(round).toBeInstanceOf(Round);
        expect(round.getStatus()).toEqual('STARTED');
    });

    test('it should finish a round', () => {
        const round = new Round();
        expect(round).toBeInstanceOf(Round);
        expect(round.getStatus()).toEqual('STARTED');

        round.finishRound();
        expect(round.getStatus()).toEqual('FINISHED');
    });
});