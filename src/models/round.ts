import { Player } from "./player.js";

export class Round {
    //status
    //players
    //active player
    private status: string;

    constructor(private players: Player[]) {
        this.status = 'Started';
    }

    updateStatus(status: string): void {
        this.status = status;
    }

    getStatus(): string {
        return this.status;
    }
}