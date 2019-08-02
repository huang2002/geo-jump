import { PLAYER_CATEGORY, MAIN_SCENE_LINE_WIDTH, FRICTION, STATIC_FRICTION, ELASTICITY, MAIN_SCENE_SHADOW_COLOR } from "./common.js";

export const INIT_Y = -80,
    SCORE_SCALE = .05;

let score = 0;

export const getScore = () => score;

/** @param {number} distance */
export const updateScore = distance => score = Math.max(score, Math.round(distance * SCORE_SCALE));
;

export const resetScore = () => {
    score = 0;
};

export const player = new HE.Circle({
    category: PLAYER_CATEGORY,
    active: true,
    radius: 20,
    elasticity: ELASTICITY,
    friction: FRICTION,
    staticFriction: STATIC_FRICTION,
    maxSpeed: 80,
    fillFirst: false,
    style: {
        strokeStyle: '#0CF',
        lineWidth: MAIN_SCENE_LINE_WIDTH,
        shadowColor: MAIN_SCENE_SHADOW_COLOR,
        shadowOffsetY: MAIN_SCENE_LINE_WIDTH,
    },
});

export const resetPlayer = () => {
    player.activate();
    player.velocity.reset();
    player.moveTo(0, INIT_Y);
};
