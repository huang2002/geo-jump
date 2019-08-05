import { CHARACTERS } from "./characters.js";
import { query, STORAGE_KEYS } from "./store.js";

export const INIT_Y = -80,
    SCORE_SCALE = .05;

let score = 0;

export const getScore = () => score;

/** @param {number} distance */
export const updateScore = distance => score = Math.max(score, Math.round(distance * SCORE_SCALE));

export const resetScore = () => {
    score = 0;
};

export let player = CHARACTERS[query(STORAGE_KEYS.CHARACTER)];

export const resetPlayer = () => {
    player.activate();
    player.velocity.reset();
    player.moveTo(0, INIT_Y);
};
