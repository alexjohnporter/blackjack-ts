//todo - use proper types to limit value to 2-10 + face cards
//todo - limit suit to hearts, diamonds, clubs and spades

export class Card {
    constructor(
        private readonly suit: string,
        private readonly value: number | string
    ) { }

    getId(): string {
        return `${this.suit}-${this.value}`;
    }

    getSuit(): string {
        return this.suit;
    }

    getValue(): string | number {
        return this.value;
    }

    getNumberValue(): number {
        if (!Number.isNaN(+this.value)) {
            return +this.value
        };

        //todo - need to account for Aces
        return 10;
    }
}
