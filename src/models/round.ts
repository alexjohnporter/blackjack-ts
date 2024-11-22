import { Player } from "./player.js";


type Status = "STARTED" | "FINISHED";

export class Round {
    //status
    //players
    //active player
    private status: Status;

    constructor(private players: Player[]) {
        this.status = 'STARTED';
    }

    finishRound(): void {
        this.status = 'FINISHED';
    }

    getStatus(): string {
        return this.status;
    }
}