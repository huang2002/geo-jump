import { CHARACTERS } from "./characters.js";
import { query, STORAGE_KEYS } from "./store.js";

export const INIT_Y = -80,
    SCORE_SCALE = .05,
    BONUS = 10;

let score = 0,
    bonus = 0;;

export const getScore = () => score + bonus;

/** @param {number} distance */
export const updateScore = distance => {
    score = Math.max(score, Math.round(distance * SCORE_SCALE));
};

export const addBonus = () => {
    bonus += BONUS;
};

export const resetScoreAndBonus = () => {
    score = bonus = 0;
};

let player = CHARACTERS[query(STORAGE_KEYS.CHARACTER)].shape;

export const getPlayer = () => player;

/** @param {typeof player} character */
export const setPlayer = character => {
    player = character;
};

export const resetPlayer = () => {
    player.activate();
    player.velocity.reset();
    player.moveTo(0, INIT_Y);
};
