export const { Text, Vector, Rectangle, Utils } = HE;

export const renderer = new HE.Renderer({
    width: 320,
    height: 480,
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
    MAIN_SCENE_SHADOW_COLOR = '#002',
    ELASTICITY = 0.1,
    FRICTION = .97,
    STATIC_FRICTION = .98;

SCENE_BACKGROUND.addColorStop(0, '#222');
SCENE_BACKGROUND.addColorStop(1, '#111');

const COLORS = ['#F0C', '#F00', '#F60', '#FF0', '#9F0',
    '#090', '#0F0', '#0F9', '#06F', '#C0F'];

export const getRandomColor = () => Utils.pick(COLORS);

export const LANGUAGES = {
    EN: 'en',
    CN: 'zh',
};;
