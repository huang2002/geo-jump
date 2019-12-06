export const { Text, Vector, Rectangle, Utils } = HE;

export const renderer = new HE.Renderer({
    width: 320,
    height: 480,
    sizing: HE.Sizing.Fixed,
    margin: 0,
});

export const engine = new HE.Engine({
    renderer,
});

export const { bounds } = renderer;

const { Category } = HE;

export const SCENE_BACKGROUND = renderer.context.createLinearGradient(0, bounds.top, 0, bounds.bottom),
    PLAYER_CATEGORY = Category.for('player'),
    BOMB_CATEGORY = Category.for('bomb'),
    SHAPE_CATEGORY = Category.for('shape'),
    MAIN_SCENE_LINE_WIDTH = 4,
    ELASTICITY = 0.05,
    FRICTION = .91,
    STATIC_FRICTION = .91,
    COMMON_SHADOW = {
        shadowColor: '#013',
        shadowOffsetY: 3,
    };

SCENE_BACKGROUND.addColorStop(0, '#111');
SCENE_BACKGROUND.addColorStop(1, '#112');

const COLORS = ['#F0C', '#F00', '#F60', '#FF0', '#9F0',
    '#090', '#0F0', '#0F9', '#06F', '#C0F'];

export const getRandomColor = () => Utils.pick(COLORS);

export const LANGUAGES = {
    EN: 'en',
    CN: 'zh',
};;
