import { LANGUAGES } from "./common.js";

export const STORAGE_KEYS = {
    HI: 'hi',
    LANG: 'lang',
    COINS: 'coins',
    PAID: 'paid',
    CHARACTER: 'character',
};

const LOCALSTORAGE_NAME = 'geo-jump-store',
    DEFAULTS = {
        [STORAGE_KEYS.HI]: 0,
        [STORAGE_KEYS.LANG]: LANGUAGES.EN,
        [STORAGE_KEYS.COINS]: 0,
        [STORAGE_KEYS.PAID]: [0],
        [STORAGE_KEYS.CHARACTER]: 0,
    };

/** @param {object} value */
const save = value => {
    localStorage.setItem(LOCALSTORAGE_NAME, JSON.stringify(value));
};

const store = (() => {
    try {
        const _store = JSON.parse(localStorage.getItem(LOCALSTORAGE_NAME) || '');
        let changed = false;
        Object.entries(DEFAULTS).forEach(([key, value]) => {
            if (!(key in _store)) {
                changed = true;
                _store[key] = value;
            }
        });
        if (changed) {
            save(_store);
        }
        return _store;
    } catch {
        save(DEFAULTS);
        return { ...DEFAULTS };
    }
})();

/** @param {string} key */
export const query = key => store[key];

/**
 * @param {string} key
 * @param {unknown} value
 */
export const update = (key, value) => {
    store[key] = value;
    save(store);
};
