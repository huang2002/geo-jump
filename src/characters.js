import {
    PLAYER_CATEGORY, ELASTICITY, FRICTION, STATIC_FRICTION,
    MAIN_SCENE_LINE_WIDTH, MAIN_SCENE_SHADOW_COLOR
} from "./common.js";

const SIZE = 20,
    COMMON_OPTIONS = {
        category: PLAYER_CATEGORY,
        active: true,
        elasticity: ELASTICITY,
        friction: FRICTION,
        staticFriction: STATIC_FRICTION,
        maxSpeed: 80,
        fillFirst: false,
    },
    COMMON_STYLE = {
        lineWidth: MAIN_SCENE_LINE_WIDTH,
        shadowColor: MAIN_SCENE_SHADOW_COLOR,
        shadowOffsetY: MAIN_SCENE_LINE_WIDTH,
    };

export const CHARACTERS = [
    {
        price: 0,
        shape: new HE.Circle({
            ...COMMON_OPTIONS,
            radius: SIZE,
            style: {
                ...COMMON_STYLE,
                strokeStyle: '#0CF',
            },
        }),
    },
    {
        price: 500,
        shape: new HE.Rectangle({
            ...COMMON_OPTIONS,
            width: SIZE * 2,
            height: SIZE * 2,
            radius: 15,
            style: {
                ...COMMON_STYLE,
                strokeStyle: '#0CF',
            },
        }),
    },
    {
        price: 1000,
        shape: new HE.Polygon({
            ...COMMON_OPTIONS,
            vertices: HE.Vertices.createPolygon(8, SIZE, Math.PI / 8),
            style: {
                ...COMMON_STYLE,
                strokeStyle: '#0CF',
            },
        }),
    },
    {
        price: 1500,
        shape: new HE.Rectangle({
            ...COMMON_OPTIONS,
            width: SIZE * 2,
            height: SIZE * 2,
            style: {
                ...COMMON_STYLE,
                strokeStyle: '#0CF',
                lineJoin: 'round',
            },
        }),
    },
];