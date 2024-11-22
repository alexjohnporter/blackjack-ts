export type Suit = 'Diamonds' | 'Hearts' | 'Clubs' | 'Spades';

export class Card {
    constructor(
        private readonly suit: Suit,
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

        if (this.isAce()) {
            return 11;
        }

        return 10;
    }

    toHumanReadable(): string {
        return `${this.value} of ${this.suit}`
    }

    isAce(): boolean {
        return this.value === 'Ace';
    }
}
