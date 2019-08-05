import {
    PLAYER_CATEGORY, ELASTICITY, FRICTION, STATIC_FRICTION,
    MAIN_SCENE_LINE_WIDTH, MAIN_SCENE_SHADOW_COLOR
} from "./common.js";

const COMMON_OPTIONS = {
    category: PLAYER_CATEGORY,
    active: true,
    elasticity: ELASTICITY,
    friction: FRICTION,
    staticFriction: STATIC_FRICTION,
    maxSpeed: 80,
    fillFirst: false,
}, COMMON_STYLES = {
    lineWidth: MAIN_SCENE_LINE_WIDTH,
    shadowColor: MAIN_SCENE_SHADOW_COLOR,
    shadowOffsetY: MAIN_SCENE_LINE_WIDTH,
};

export const CHARACTERS = [

    new HE.Circle({
        ...COMMON_OPTIONS,
        radius: 20,
        style: {
            ...COMMON_STYLES,
            strokeStyle: '#0CF',
        },
    }),

];
