import { Dealer } from "./dealer.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";
import { Round } from "./round.js";

type Status = 'STARTED' | 'FINISHED';

//todo - singleton for Game?
export class Game {
    private startedAt: Date;
    private rounds: Round[];
    private status: Status;

    constructor(private players: Player[], private deck: Deck) {
        this.startedAt = new Date();
        this.rounds = [];
        this.status = 'STARTED';
    }

    getPlayers(): Player[] {
        return this.players;
    }

    getActivePlayer(): Player {
        return this.players.filter(player => !player.isDealer())[0];
    }

    getDealer(): Dealer {
        return this.players.filter(player => player.isDealer())[0];
    }

    dealHandsToPlayers() {
        this.players.forEach(player => {
            player.clearHand();
            player.dealHand(this.deck.dealInitialCards());
        });
    }

    getDeck(): Deck {
        return this.deck;
    }

    newRound() {
        //ensure no active rounds before creating new round
        this.rounds.forEach(round => round.finishRound());

        this.rounds.push(new Round(this.players));
    }

    endCurrentRound(): void {
        this.getActiveRound()?.finishRound();
    }

    getActiveRound(): Round | null {
        return this.rounds.filter(round => round.getStatus() !== 'Finished')[0] ?? null;
    }

    endGame(): void {
        this.status = 'FINISHED';
    }

    getStatus(): string {
        return this.status;
    }
}