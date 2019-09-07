import { CHARACTERS } from "./characters.js";
import { query, STORAGE_KEYS } from "./store.js";
import { mainScene } from "./mainScene.js";
import { bounds } from "./common.js";

export const INIT_Y = -80,
    SCORE_SCALE = .05,
    BONUS = 10,
    BONUS_TEXT_HALF_WIDTH = 100,
    BONUS_TEXT_OFFSET_Y = -50;

let score = 0,
    bonus = 0;;

export const getScore = () => score + bonus;

/** @param {number} distance */
export const updateScore = distance => {
    score = Math.max(score, Math.round(distance * SCORE_SCALE));
};

const bonusTextPool = new HE.Pool(HE.Text, {
    content: '+10',
    style: {
        font: 'bold 36px Consolas',
        fillStyle: '#FF0',
        textAlign: 'center',
    },
});

/**
 * @param {number} x
 * @param {number} y
 */
export const addBonus = (x, y) => {
    bonus += BONUS;
    const bonusText = bonusTextPool.get();
    bonusText.position.set(x, y + BONUS_TEXT_OFFSET_Y);
    const BOUNDS_RIGHT = x + BONUS_TEXT_HALF_WIDTH;
    const onDidUpdate = () => {
        // @ts-ignore
        if (BOUNDS_RIGHT < bounds.left + mainScene.camera.position.x) {
            mainScene.off('didUpdate', onDidUpdate);
            mainScene.detach(bonusText);
            bonusTextPool.add(bonusText);
        }
    };
    mainScene.on('didUpdate', onDidUpdate);
    mainScene.attach(bonusText);
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
