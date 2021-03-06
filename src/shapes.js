import {
    SHAPE_CATEGORY, PLAYER_CATEGORY, BOMB_CATEGORY, MAIN_SCENE_LINE_WIDTH,
    Rectangle, getRandomColor, Utils, FRICTION, STATIC_FRICTION, ELASTICITY, COMMON_SHADOW
} from "./common.js";
import { addCoin } from "./coins.js";

const COUNT = 3,
    MIN_WIDTH = 100,
    MAX_WIDTH = 200,
    MIN_HEIGHT = 60,
    MAX_HEIGHT = 120,
    MIN_GAP = 15,
    MAX_GAP = 50,
    MIN_Y = 30,
    MAX_Y = 100,
    COIN_OFFSET_Y = -50,
    COIN_RATE = .20;

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
        ...COMMON_SHADOW,
        lineWidth: MAIN_SCENE_LINE_WIDTH,
    },
};

/** @typedef {HE.Rectangle} Shape */

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
    /** @type {Shape} */
    // @ts-ignore
    const shiftingShape = shapes.shift();
    shapes.push(shiftingShape);
    initShape(shiftingShape);
    updateShape(2);
    if (Math.random() <= COIN_RATE) {
        addCoin(shiftingShape.position.x, shiftingShape.bounds.top + COIN_OFFSET_Y);
    }
};
