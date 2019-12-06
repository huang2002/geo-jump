import { BOMB_CATEGORY, SHAPE_CATEGORY, bounds, Vector } from "./common.js";
import { createParticles } from "./particles.js";
import { getPlayer } from "./player.js";

const SPEED = 35,
    SIZE = 10,
    MAX_EFFECT = 25,
    EFFECT_COEFFICIENT = 18;

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
 * @param {HE.Vector} position
 * @param {HE.Vector} direction
 */
export const createBomb = (scene, position, direction) => {
    const bomb = bombPool.get(),
        player = getPlayer();
    bomb.moveToVector(position);
    bomb.velocity.setVector(direction)
        .setNorm(SPEED)
        .plusVector(player.velocity);
    const clear = () => {
        bomb.off('collision', onCollision);
        bomb.off('didUpdate', onDidUpdate)
        scene.remove(bomb);
        bombPool.add(bomb);
    }, onCollision = () => {
        createParticles(scene, bomb.position);
        clear();
        const deltaVector = Vector.minus(player.position, bomb.position);
        player.velocity.plusVector(
            deltaVector.setNorm(
                Math.min(
                    MAX_EFFECT,
                    MAX_EFFECT * EFFECT_COEFFICIENT / deltaVector.getNorm()
                )
            )
        );
    }, onDidUpdate = () => {
        if (bomb.bounds.top > bounds.bottom) {
            clear();
        }
    };
    bomb.on('collision', onCollision)
        .on('didUpdate', onDidUpdate);
    scene.add(bomb);
};
