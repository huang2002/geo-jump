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
            'Click　the　screen　to',
            'emit　bombs　which',
            'explode　while　colliding',
            'with　shapes　and　drive',
            'your　circle　to　move',
            'further.　The　further',
            'your　circle　moves,　the',
            'more　scores　you　get.',
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
            '　　点击屏幕发射炸弹，',
            '　　炸弹接触方块爆炸，',
            '　　同时推动小球移动。',
            '　　按球前进距离计分，',
            '　　距离越远分数越高。',
        ],
    },
};

const currentLang = query(STORAGE_KEYS.LANG);

export const CONTENT = CONTENT_MAP[currentLang];

export const toggleLang = () => {
    update(STORAGE_KEYS.LANG, currentLang === LANGUAGES.EN ? LANGUAGES.CN : LANGUAGES.EN);
    location.reload();
};
