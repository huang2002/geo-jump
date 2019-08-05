import { engine, SCENE_BACKGROUND, Rectangle, Vector, bounds, Text } from "./common.js";
import { CONTENT } from "./intl.js";
import { menuScene } from "./menuScene.js";
import { CHARACTERS, SIZE } from "./characters.js";
import { query, STORAGE_KEYS, update } from "./store.js";
import { setPlayer } from "./player.js";

export const shopScene = engine.createScene({
    background: SCENE_BACKGROUND,
    fps: 10,
});

shopScene.attach(
    new Text({
        content: CONTENT.SHOP,
        position: Vector.of(0, bounds.top + 30),
        style: {
            font: 'bold 40px Consolas',
            textBaseline: 'top',
            strokeStyle: null,
            fillStyle: '#F60',
            shadowColor: '#310',
            shadowOffsetY: 3,
        },
    })
);

const coinsText = new Text({
    content: CONTENT.COINS_PREFIX + '???',
    position: Vector.of(0, bounds.top + 100),
    style: {
        font: 'bold 20px Consolas',
        fillStyle: '#FF0',
        strokeStyle: null,
        shadowColor: '#330',
        shadowOffsetY: 2,
    },
});

const updateCoins = () => {
    coinsText.content = CONTENT.COINS_PREFIX + query(STORAGE_KEYS.COINS);
};

shopScene.attach(coinsText).on('enter', updateCoins);

const COMMON_ITEM_BUTTON_OPTIONS = {
    interactive: true,
    width: 110,
    height: 30,
    radius: 3,
    style: {
        strokeStyle: '#060',
        lineWidth: 2,
    },
}, ITEM_BUTTON_TEXT_STYLE = {
    font: '14px Consolas',
    fillStyle: '#0D0',
    strokeStyle: null,
};

const itemButtons = CHARACTERS.map((character, i) => {
    const text = new Text({
        style: ITEM_BUTTON_TEXT_STYLE,
    });
    return new Rectangle({
        ...COMMON_ITEM_BUTTON_OPTIONS,
        attachments: [text],
    }).on('click', () => {
        if (text.content.startsWith(CONTENT.BUY)) {
            const coins = query(STORAGE_KEYS.COINS);
            if (coins < character.price) {
                alert(CONTENT.UNAFFORDABLE);
            } else {
                update(STORAGE_KEYS.COINS, coins - character.price);
                update(STORAGE_KEYS.PAID, query(STORAGE_KEYS.PAID).concat(i));
                updateButtons();
                updateCoins();
            }
        } else if (text.content === CONTENT.USE) {
            update(STORAGE_KEYS.CHARACTER, i);
            updateButtons();
            setPlayer(character.shape);
        }
    });
});

const updateButtons = () => {
    /** @type {number[]} */
    const paidItemIndices = query(STORAGE_KEYS.PAID),
        usingIndex = query(STORAGE_KEYS.CHARACTER);
    itemButtons.forEach((itemButton, i) => {
        const paid = paidItemIndices.includes(i);
        // @ts-ignore
        itemButton.attachments[0].content = paid ?
            i === usingIndex ? CONTENT.USING : CONTENT.USE :
            CONTENT.BUY + CONTENT.PARETHESIS[0] + CHARACTERS[i].price + CONTENT.PARETHESIS[1];
    });
};

shopScene.on('enter', updateButtons);

const ITEM_COUNT_PER_ROW = 2,
    ITEM_OFFSET_X = 140,
    ITEM_OFFSET_Y = 130,
    ITEMS_LEFT = -ITEM_OFFSET_X * (ITEM_COUNT_PER_ROW - 1) / 2,
    ITEMS_TOP = -80,
    ITEM_LAYER_SIZE = SIZE * 2 + 15,
    ITEM_BUTTON_OFFSET = SIZE + 30;
let itemX = ITEMS_LEFT,
    itemY = ITEMS_TOP;
CHARACTERS.forEach((character, i) => {
    const position = Vector.of(itemX, itemY);
    character.shape.moveToVector(position);
    const layer = new HE.Layer({
        offset: position,
        width: ITEM_LAYER_SIZE,
        height: ITEM_LAYER_SIZE,
        objects: [character.shape],
    });
    layer.cache(true);
    shopScene.attach(layer);
    const itemButton = itemButtons[i];
    itemButton.moveTo(itemX, itemY + ITEM_BUTTON_OFFSET);
    shopScene.attach(itemButton);
    if ((i + 1) % ITEM_COUNT_PER_ROW) {
        itemX += ITEM_OFFSET_X;
    } else {
        itemX = ITEMS_LEFT;
        itemY += ITEM_OFFSET_Y;
    }
});

shopScene.attach(
    new Rectangle({
        interactive: true,
        position: Vector.of(0, bounds.bottom - 60),
        width: 90,
        height: 40,
        radius: 6,
        style: {
            strokeStyle: '#CB0',
            lineWidth: 3,
            shadowColor: '#320',
            shadowOffsetY: 4,
        },
        attachments: [
            new Text({
                content: CONTENT.BACK,
                style: {
                    font: 'bold 20px Consolas',
                    strokeStyle: null,
                    fillStyle: '#FC0',
                    shadowColor: '#310',
                    shadowOffsetY: 3,
                },
            })
        ],
    }).on('click', () => {
        engine.enter(menuScene);
    })
);
