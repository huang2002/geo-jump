import {
    SHAPE_CATEGORY, PLAYER_CATEGORY, BOMB_CATEGORY, MAIN_SCENE_LINE_WIDTH,
    Rectangle, getRandomColor, Utils, FRICTION, STATIC_FRICTION, ELASTICITY, MAIN_SCENE_SHADOW_COLOR
} from "./common.js";

const COUNT = 3,
    MIN_WIDTH = 90,
    MAX_WIDTH = 130,
    MIN_HEIGHT = 60,
    MAX_HEIGHT = 150,
    MIN_GAP = 15,
    MAX_GAP = 70,
    MIN_Y = 20,
    MAX_Y = 100;

/** @type {HE.ShapeOptions} */
const SHAPE_OPTIONS = {
    category: SHAPE_CATEGORY,
    collisionFilter: PLAYER_CATEGORY | BOMB_CATEGORY,
    radius: 5,
    elasticity: ELASTICITY,
    friction: FRICTION,
    staticFriction: STATIC_FRICTION,
    fillFirst: false,
    style: {
        lineWidth: MAIN_SCENE_LINE_WIDTH,
        shadowColor: MAIN_SCENE_SHADOW_COLOR,
        shadowOffsetY: MAIN_SCENE_LINE_WIDTH,
    },
};

/** @typedef {Rectangle} Shape */

/** @type {Shape[]} */
export const shapes = [];

for (let i = 0; i < COUNT; i++) {
    shapes.push(new Rectangle(SHAPE_OPTIONS));
}

/** @param {Shape} shape */
const initShape = shape => {
    shape.style.strokeStyle = getRandomColor();
    shape.updateSize(
        Utils.random(MIN_WIDTH, MAX_WIDTH),
        Utils.random(MIN_HEIGHT, MAX_HEIGHT)
    );
};

const getRandomGap = () => Utils.random(MIN_GAP, MAX_GAP),
    getRandomY = () => Utils.random(MIN_Y, MAX_Y);

/** @param {number} index */
const updateShape = index => {
    const shape = shapes[index];
    shape.moveTo(
        shapes[index - 1].bounds.right + shape.width / 2 + getRandomGap(),
        shape.height / 2 + getRandomY()
    );
};

export const resetShapes = () => {
    shapes.forEach((shape, index) => {
        initShape(shape);
        if (index) {
            updateShape(index);
        } else {
            shape.moveTo(0, getRandomY());
        }
    });
};

export const updateShapes = () => {
    // @ts-ignore
    shapes.push(shapes.shift());
    initShape(shapes[2]);
    updateShape(2);
};
