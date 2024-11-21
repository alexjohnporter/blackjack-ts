#!/usr/bin/env node
import { input, select } from '@inquirer/prompts';
import { composeDeck } from './factory/deckFactory.js';
import { Player } from './models/player.js';
import { Hand } from './models/hand.js';
import { Dealer } from './models/dealer.js';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));


console.log('Welcome to Blackjack');

sleep(1000);

const playerName = await input({ message: 'Enter your name' });

sleep(1000);

console.log(`Hi ${playerName}, you have £100 to play with. Each bet is £10. Let's get started`);

const deck = composeDeck();
const player = new Player(playerName, 100);
const dealer = new Dealer();

player.dealHand(deck.dealInitialCards());
dealer.dealHand(deck.dealInitialCards());

console.log(`you have ${player.getHand().toHumanReadable()}`);

const action = await select({
    message: 'Stick or Twist?',
    choices: [
        { name: 'Stick', value: 'stick' },
        { name: 'Twist', value: 'twist' },
        { name: 'Split', value: 'split', disabled: true }
    ],
});

if (action === 'twist') {
    player.twist(deck.dealCard());

    console.log(`you have ${player.getHand().toHumanReadable()}`);

    if (player.getHand().isBust()) {
        console.log('Uh oh, you are bust!');
    }

    if (player.getHand().isBlackJack()) {
        console.log('Congratulation, you have BlackJack');
    }

}

// console.log(player.getHand().getHandValue());

// console.log(action);