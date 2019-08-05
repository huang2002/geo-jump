import { query, STORAGE_KEYS, update } from "./store.js";
import { LANGUAGES } from "./common.js";

const CONTENT_MAP = {
    [LANGUAGES.EN]: {
        TITLE: 'GEO JUMP',
        HI_PREFIX: 'HI: ',
        START: 'START',
        HELP: 'HELP',
        TOGGLE_LANG: '中文',
        SCORE_PREFIX: 'SCORE: ',
        CONTINUE: 'CONTINUE',
        BACK: 'BACK',
        HELP_PARAGRAPH: [
            'Click screen to emit ',
            'bombs which explode  ',
            'while colliding with ',
            'shapes and drive your',
            'character to move.   ',
            'The further your     ',
            'character moves, the ',
            'more scores you get. ',
        ],
    },
    [LANGUAGES.CN]: {
        TITLE: '几何弹跳',
        HI_PREFIX: '最高：',
        START: '开始',
        HELP: '帮助',
        TOGGLE_LANG: 'ENG',
        SCORE_PREFIX: '分数：',
        CONTINUE: '继续',
        BACK: '返回',
        HELP_PARAGRAPH: [
            '',
            '点击屏幕以发射炸弹，',
            '炸弹接触方块时爆炸，',
            '同时会推动角色移动。',
            '按角色前进距离计分，',
            '距离越远则分数越高。',
        ],
    },
};

const currentLang = query(STORAGE_KEYS.LANG);

export const CONTENT = CONTENT_MAP[currentLang];

export const toggleLang = () => {
    update(STORAGE_KEYS.LANG, currentLang === LANGUAGES.EN ? LANGUAGES.CN : LANGUAGES.EN);
    location.reload();
};
