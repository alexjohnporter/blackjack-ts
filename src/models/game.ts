import { Dealer } from "./dealer.js";
import { Deck } from "./deck.js";
import { Player } from "./player.js";
import { Round } from "./round.js";

type Status = 'STARTED' | 'FINISHED';

export class Game {
    private static instance: Game;
    private startedAt: Date;
    private rounds: Round[];
    private status: Status;

    private constructor(private players: Player[], private deck: Deck) {
        this.startedAt = new Date();
        this.rounds = [];
        this.status = 'STARTED';
    }

    static getInstance(players: Player[], deck: Deck): Game {
        if (!Game.instance) {
            Game.instance = new Game(players, deck);
        }
        return Game.instance;
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

        this.rounds.push(new Round());
    }

    endCurrentRound(): void {
        this.getActiveRound()?.finishRound();
    }

    getActiveRound(): Round | null {
        return this.rounds.find(round => round.getStatus() !== 'Finished') ?? null;
    }

    endGame(): void {
        this.endCurrentRound();
        this.status = 'FINISHED';
    }

    getStatus(): Status {
        return this.status;
    }

    getRounds(): Round[] {
        return this.rounds;
    }
}