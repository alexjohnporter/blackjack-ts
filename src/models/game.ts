import { Dealer } from "./dealer.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";
import { Round } from "./round.js";

//todo - singleton for Game?
export class Game {
    private startedAt: Date;
    private rounds: Round[];
    private status: string;

    constructor(private players: Player[], private deck: Deck) {
        this.startedAt = new Date();
        this.rounds = [];
        this.status = 'Started';
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
        //todo - add functionalitY to expire all other rounds if they are active
        this.rounds.push(new Round(this.players));
    }

    endCurrentRound(): void {
        this.getActiveRound()?.updateStatus('Finished');
    }

    getActiveRound(): Round | null {
        return this.rounds.filter(round => round.getStatus() !== 'Finished')[0] ?? null;
    }

    endGame(): void {
        this.status = 'Ended';
    }

    getStatus(): string {
        return this.status;
    }
}