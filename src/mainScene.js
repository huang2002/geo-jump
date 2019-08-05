import {
    engine, Text, Vector, bounds, Rectangle,
    SCENE_BACKGROUND, Utils
} from "./common.js";
import { shapes, resetShapes, updateShapes } from "./shapes.js";
import { player, resetPlayer, getScore, updateScore, resetScore } from "./player.js";
import { createBomb } from "./bombs.js";
import { menuScene } from "./menuScene.js";
import { STORAGE_KEYS, query, update } from "./store.js";
import { CONTENT } from "./intl.js";

const FPS_HI = 60,
    FPS_LO = 30;

const camera = new HE.Camera();

export const mainScene = engine.createScene({
    background: SCENE_BACKGROUND,
    camera,
});

mainScene.add(player);

shapes.forEach(shape => {
    mainScene.add(shape);
});

const scoreText = new Text({
    position: Vector.of(0, bounds.top + 30),
    style: {
        font: 'bold 24px Consolas',
        strokeStyle: null,
        fillStyle: '#0FC',
        textBaseline: 'top',
    },
});
mainScene.attach(scoreText);

const hiText = new Text({
    position: Vector.of(0, bounds.top + 60),
    style: {
        font: 'bold 24px Consolas',
        strokeStyle: null,
        fillStyle: '#0CF',
        textBaseline: 'top',
    },
});
mainScene.attach(hiText);

const endButton = new Rectangle({
    interactive: true,
    position: Vector.of(0, -40),
    width: 120,
    height: 40,
    radius: 6,
    style: {
        fillStyle: '#333',
        strokeStyle: '#999',
        lineWidth: 3,
        shadowColor: '#000',
        shadowOffsetY: 4,
    },
    attachments: [new Text({
        content: CONTENT.CONTINUE,
        style: {
            font: 'bold 18px Consolas',
            strokeStyle: null,
            fillStyle: '#0FF',
            shadowColor: '#000',
            shadowOffsetY: 2,
        },
    })],
}).on('click', () => {
    engine.enter(menuScene);
});

const gainText = new Text({
    position: Vector.of(0, -5),
    style: {
        font: 'bold 16px Consolas',
        strokeStyle: null,
        fillStyle: '#F90',
        textBaseline: 'top',
        shadowColor: '#000',
        shadowOffsetY: 2,
    },
});

mainScene.on('enter', () => {
    mainScene.fps = FPS_HI;
    mainScene.detach(endButton);
    mainScene.detach(gainText);
    mainScene.effects.forEach(effect => {
        if (effect instanceof HE.Transition) {
            effect.finish();
        }
    });
    resetShapes();
    resetPlayer();
    resetScore();
}).on('didUpdate', () => {
    if (player.bounds.top < bounds.bottom) {
        const { x } = player.position;
        const score = updateScore(
            camera.position.x =
            hiText.position.x =
            scoreText.position.x = x
        );
        scoreText.content = CONTENT.SCORE_PREFIX + score;
        hiText.content = CONTENT.HI_PREFIX + Math.max(query(STORAGE_KEYS.HI), score);
        if (player.bounds.left >= shapes[1].position.x) {
            updateShapes();
        }
    } else if (player.active) {
        player.activate(false);
        mainScene.fps = FPS_LO;
        endButton.moveTo(player.position.x, endButton.position.y);
        gainText.position.x = player.position.x;
        mainScene.attach(endButton);
        mainScene.attach(gainText);
        const score = getScore(),
            record = query(STORAGE_KEYS.HI);
        if (score > record) {
            update(STORAGE_KEYS.HI, score);
        }
        gainText.content = CONTENT.GAIN + score;
        update(STORAGE_KEYS.COINS, query(STORAGE_KEYS.COINS) + score);
    }
});

const spawnBomb = Utils.throttle(
    /** @param {HE.Vector} position */
    position => {
        const direction = Vector.minus(position, player.position);
        if (!direction.isZero()) {
            createBomb(mainScene, player.position, direction);
        }
    },
    250
);

engine.pointer.on('click', position => {
    if (!mainScene.active) {
        return;
    }
    if (player.active) {
        spawnBomb(position);
    }
});
