#!/usr/bin/env node

import { initGame } from './actions/init-game.js';
import { startNewRound } from './actions/start-new-round.js';

const game = await initGame();
await startNewRound(game, true);