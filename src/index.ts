#!/usr/bin/env node
import { input, select } from '@inquirer/prompts';
import { composeDeck } from './factory/deckFactory.js';
import { Player } from './models/player.js';
import { Hand } from './models/hand.js';

// const answer = await input({ message: 'Enter your name' });

// const action = await select({
//     message: 'Stick or Twist?', 
//     choices: [
//         {name: 'Stick', value: 'stick'},
//         {name: 'Twist', value: 'twist'},
//         {name: 'Split', value: 'split', disabled: true}
//     ],
// });

// console.log('index');
const deck = composeDeck();
const player = new Player('Alex', 100);

const dealtCards = [
    deck.dealCard(),
    deck.dealCard()
];

console.log(dealtCards);

const newHand = new Hand(dealtCards);


player.dealHand(newHand);

console.log(player.getHand().getHandValue());

// console.log(action);