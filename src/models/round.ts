type Status = "STARTED" | "FINISHED";

export class Round {
    private status: Status;

    constructor() {
        this.status = 'STARTED';
    }

    finishRound(): void {
        this.status = 'FINISHED';
    }

    getStatus(): string {
        return this.status;
    }
}