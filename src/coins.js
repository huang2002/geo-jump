import { PLAYER_CATEGORY, bounds, MAIN_SCENE_LINE_WIDTH } from "./common.js";
import { mainScene } from "./mainScene.js";
import { addBonus } from "./player.js";

const coinPool = new HE.Pool(HE.Circle, {
    tag: 'coin',
    sensorFilter: PLAYER_CATEGORY,
    collisionFilter: PLAYER_CATEGORY,
    radius: 18,
    style: {
        strokeStyle: '#FF0',
        lineWidth: MAIN_SCENE_LINE_WIDTH,
    },
});

coinPool.size = 2;

/**
 * @param {number} x
 * @param {number} y
 */
export const addCoin = (x, y) => {
    const coin = coinPool.get();
    coin.moveTo(x, y);
    const clear = () => {
        coin.off('collision', onCollision);
        coin.off('didUpdate', onDidUpdate);
        mainScene.remove(coin);
        coinPool.add(coin);
    }, onCollision = () => {
        addBonus(x, y);
        clear();
    }, onDidUpdate = () => {
        // @ts-ignore
        if (coin.bounds.right < bounds.left + mainScene.camera.position.x) {
            clear();
        }
    };
    coin.on('collision', onCollision)
        .on('didUpdate', onDidUpdate);
    mainScene.add(coin);
};
