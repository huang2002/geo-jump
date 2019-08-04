import { engine, SCENE_BACKGROUND, Text, Vector, Rectangle, bounds } from "./common.js";
import { menuScene } from "./menuScene.js";
import { CONTENT } from "./intl.js";

const PADDING = 40,
    BUTTON_HEIGHT = 40,
    PARAGRAPH_TOP = -120,
    LINE_X = -110,
    LINE_GAP = 15;

export const helpScene = engine.createScene({
    background: SCENE_BACKGROUND,
    fps: 2,
    attachments: [

        new Text({
            content: CONTENT.HELP,
            position: Vector.of(0, bounds.top + PADDING),
            style: {
                font: 'bold 40px Consolas',
                textBaseline: 'top',
                strokeStyle: null,
                fillStyle: '#F60',
                shadowColor: '#310',
                shadowOffsetY: 3,
            },
        }),

        new HE.Line({
            start: Vector.of(LINE_X, PARAGRAPH_TOP),
            end: Vector.of(LINE_X, 70),
            style: {
                strokeStyle: '#0F0',
                lineWidth: 4,
                shadowColor: '#030',
                shadowOffsetX: 1,
                shadowOffsetY: 2,
            },
        }),

        new HE.Paragraph({
            position: Vector.of(LINE_X + LINE_GAP, PARAGRAPH_TOP),
            lineHeight: 25,
            lines: CONTENT.HELP_PARAGRAPH,
            style: {
                font: '16px Consolas',
                strokeStyle: null,
                fillStyle: '#0CF',
                textAlign: 'left',
                textBaseline: 'top',
                shadowColor: '#013',
                shadowOffsetY: 2,
            },
        }),

        new Rectangle({
            interactive: true,
            position: Vector.of(0, bounds.bottom - PADDING - BUTTON_HEIGHT / 2),
            width: 90,
            height: BUTTON_HEIGHT,
            radius: 6,
            style: {
                strokeStyle: '#999',
                lineWidth: 3,
                shadowColor: '#111',
                shadowOffsetY: 4,
            },
            attachments: [new Text({
                content: CONTENT.BACK,
                style: {
                    font: 'bold 20px Consolas',
                    strokeStyle: null,
                    fillStyle: '#FC0',
                    shadowColor: '#310',
                    shadowOffsetY: 3,
                },
            })],
        }).on('click', () => {
            engine.enter(menuScene);
        }),

    ],
});
