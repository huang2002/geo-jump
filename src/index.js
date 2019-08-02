/// <reference types="hengine" />
import { menuScene } from "./menuScene.js";
import { engine } from "./common.js";
import { CONTENT } from "./intl.js";

document.title = CONTENT.TITLE;

engine.enter(menuScene);
