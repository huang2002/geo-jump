import { engine, Text, Vector, Rectangle, bounds, SCENE_BACKGROUND, Utils, renderer } from "./common.js";
import { mainScene } from "./mainScene.js";
import { createParticles } from "./particles.js";
import { createBomb } from "./bombs.js";
import { query, STORAGE_KEYS } from "./store.js";
import { helpScene } from "./helpScene.js";
import { CONTENT, toggleLang } from "./intl.js";
import { shopScene } from "./shopScene.js";

export const menuScene = engine.createScene({
    background: SCENE_BACKGROUND,
    fps: 50,
});

const titleStrokeStyle = renderer.context.createLinearGradient(0, -25, 0, 25);
titleStrokeStyle.addColorStop(0, '#03F');
titleStrokeStyle.addColorStop(1, '#90C');

menuScene.attach(
    new Text({
        content: CONTENT.TITLE,
        position: Vector.of(0, -140),
        style: {
            font: '48px Consolas',
            fillStyle: '#0FF',
            strokeStyle: titleStrokeStyle,
            lineWidth: 6,
            lineJoin: 'round',
            shadowColor: '#004',
            shadowOffsetY: 6,
        },
    })
);

const hiText = new Text({
    content: CONTENT.HI_PREFIX + '???',
    position: Vector.of(0, -80),
    style: {
        font: 'bold 22px Consolas',
        fillStyle: '#0CF',
        strokeStyle: null,
        shadowColor: '#003',
        shadowOffsetY: 2,
    },
});
menuScene.attach(hiText).on('enter', () => {
    hiText.content = CONTENT.HI_PREFIX + query(STORAGE_KEYS.HI);
});

const coinsText = new Text({
    content: CONTENT.COINS_PREFIX + '???',
    position: Vector.of(0, -50),
    style: {
        font: 'bold 22px Consolas',
        fillStyle: '#0CF',
        strokeStyle: null,
        shadowColor: '#003',
        shadowOffsetY: 2,
    },
});
menuScene.attach(coinsText).on('enter', () => {
    coinsText.content = CONTENT.COINS_PREFIX + query(STORAGE_KEYS.COINS);
});

const BUTTON_TOP = 20,
    BUTTON_WIDTH = 120,
    BUTTON_HEIGHT = 40,
    BUTTON_GAP = 20,
    BUTTON_STYLE = {
        lineWidth: 3,
        shadowOffsetY: 3,
    },
    BUTTON_TEXT_STYLE = {
        font: 'bold 25px Consolas',
        strokeStyle: null,
        shadowOffsetY: 3,
    };
let buttonCount = 0;
/**
 * @param {string} text
 * @param {string} color
 * @param {string} shadowColor
 */
const createButton = (text, color, shadowColor) => new Rectangle({
    interactive: true,
    position: Vector.of(0, BUTTON_TOP + (BUTTON_HEIGHT + BUTTON_GAP) * buttonCount++),
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    radius: 6,
    style: { ...BUTTON_STYLE, strokeStyle: color, shadowColor },
    attachments: [
        new Text({
            content: text,
            style: { ...BUTTON_TEXT_STYLE, fillStyle: color, shadowColor },
        }),
    ],
});

menuScene.attach(
    createButton(CONTENT.START, '#F3C', '#613')
        .on('click', () => {
            engine.enter(mainScene);
        })
).attach(
    createButton(CONTENT.SHOP, '#FC0', '#631')
        .on('click', () => {
            engine.enter(shopScene);
        })
).attach(
    createButton(CONTENT.HELP, '#0F0', '#030')
        .on('click', () => {
            engine.enter(helpScene);
        })
);

const LINK_WIDTH = 40,
    LINK_HEIGHT = 30;

menuScene.attach(
    new Rectangle({
        interactive: true,
        position: Vector.of(bounds.right - 35, bounds.bottom - 25),
        width: LINK_WIDTH,
        height: LINK_HEIGHT,
        style: {
            strokeStyle: null,
        },
        attachments: [
            new Text({
                content: 'GH',
                style: {
                    font: 'bold 20px Consolas',
                    fillStyle: '#CCC',
                    strokeStyle: null,
                    lineJoin: 'round',
                    shadowColor: '#000',
                    shadowOffsetY: 2,
                },
            })
        ],
    }).on('click', () => {
        window.open('https://github.com/huang2002/geo-jump');
    })
);

menuScene.attach(
    new Rectangle({
        interactive: true,
        position: Vector.of(bounds.left + 40, bounds.bottom - 30),
        width: 50,
        height: 30,
        radius: 5,
        style: {
            strokeStyle: '#999',
            lineWidth: 2,
            shadowColor: '#000',
            shadowOffsetY: 2,
        },
        attachments: [
            new Text({
                content: CONTENT.TOGGLE_LANG,
                style: {
                    font: 'bold 12px Consolas',
                    fillStyle: '#CCC',
                    strokeStyle: null,
                    lineJoin: 'round',
                    shadowColor: '#000',
                    shadowOffsetY: 2,
                },
            })
        ],
    }).on('click', toggleLang)
);

const EFFECT_PADDING = 50,
    EFFECT_BOUNDS_TOP = bounds.top + EFFECT_PADDING,
    PARTICLES_BOUNDS_BOTTOM = bounds.bottom - EFFECT_PADDING,
    BOMB_BOUNDS_BOTTOM = bounds.bottom * .2,
    BOMB_BOUNDS_MARGIN = 20,
    MAX_OBJECT_COUNT = 5;
menuScene.on('enter', () => {
    menuScene.effects.forEach(effect => {
        if (effect instanceof HE.Transition) {
            effect.finish();
        }
    });
}).on(
    'willUpdate',
    Utils.throttle(() => {
        if (menuScene.objects.length >= MAX_OBJECT_COUNT) {
            return;
        }
        createParticles(
            menuScene,
            Vector.of(
                Utils.random(bounds.left + EFFECT_PADDING, bounds.right - EFFECT_PADDING),
                Utils.random(EFFECT_BOUNDS_TOP, PARTICLES_BOUNDS_BOTTOM)
            )
        );
    }, 1000)
).on(
    'willUpdate',
    Utils.throttle(() => {
        if (menuScene) {

        }
        if (Math.random() > .5) {
            createBomb(
                menuScene,
                Vector.of(
                    bounds.left - BOMB_BOUNDS_MARGIN,
                    Utils.random(EFFECT_BOUNDS_TOP, BOMB_BOUNDS_BOTTOM)
                ),
                Vector.random(0, -Utils.Const.HALF_PI * .8)
            );
        } else {
            createBomb(
                menuScene,
                Vector.of(
                    bounds.right + BOMB_BOUNDS_MARGIN,
                    Utils.random(EFFECT_BOUNDS_TOP, BOMB_BOUNDS_BOTTOM)
                ),
                Vector.random(-Math.PI, -Utils.Const.HALF_PI * 1.2)
            );
        }
    }, 1500)
);
