import { BOMB_CATEGORY, SHAPE_CATEGORY, bounds, Vector } from "./common.js";
import { createParticles } from "./particles.js";
import { getPlayer } from "./player.js";

const SPEED = 30,
    SIZE = 10,
    MAX_EFFECT = 25,
    EFFECT_COEFFICIENT = 22;

const bombPool = new HE.Pool(HE.Rectangle, {
    active: true,
    sensorFilter: SHAPE_CATEGORY,
    category: BOMB_CATEGORY,
    collisionFilter: SHAPE_CATEGORY,
    width: SIZE,
    height: SIZE,
    style: {
        strokeStyle: null,
        fillStyle: '#F30',
    },
});

/**
 * @param {HE.Scene} scene
 * @param {Vector} position
 * @param {Vector} direction
 */
export const createBomb = (scene, position, direction) => {
    const bomb = bombPool.get(),
        player = getPlayer();
    bomb.moveToVector(position);
    bomb.velocity.setVector(direction)
        .setNorm(SPEED)
        .plusVector(player.velocity);
    bomb.on('collision', target => {
        createParticles(scene, bomb.position);
        scene.remove(bomb);
        const deltaVector = Vector.minus(player.position, bomb.position);
        player.velocity.plusVector(
            deltaVector.setNorm(
                Math.min(
                    MAX_EFFECT,
                    MAX_EFFECT * EFFECT_COEFFICIENT / deltaVector.getNorm()
                )
            )
        );
    }).on('didUpdate', () => {
        if (bomb.bounds.top > bounds.bottom) {
            scene.remove(bomb);
        }
    });
    scene.add(bomb);
};

