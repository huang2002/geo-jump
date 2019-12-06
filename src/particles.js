import { Rectangle, Vector, Utils, getRandomColor } from "./common.js";

const COUNT = 20,
    MIN_SPEED = 1,
    MAX_SPEED = 16,
    LIFE = 1500,
    SIZE = 8;

/** @typedef {HE.Rectangle} Particle */

/** @type {HE.Pool<HE.Particles<Particle>, Readonly<HE.ParticlesOptions<Particle>>>} */
const particlesPool = new HE.Pool(HE.Particles, {
    count: COUNT,
    life: LIFE,
    loop: false,
    pool: new HE.Pool(Rectangle, {
        active: true,
        width: SIZE,
        height: SIZE,
        gravity: Vector.of(0, .1),
        airFriction: .08,
        style: {
            strokeStyle: null,
        },
    }),
    initializer: particle => {
        particle.style.fillStyle = getRandomColor();
        particle.position.reset();
        particle.velocity.setVector(Vector.random(), Utils.random(MIN_SPEED, MAX_SPEED));
    },
});

const effectPool = new HE.Pool(HE.Transition, {
    from: 1,
    to: 0,
    duration: LIFE,
    timing: HE.Timing.easeIn,
});

/**
 * @param {HE.Scene} scene
 * @param {HE.Vector} position
 */
export const createParticles = (scene, position) => {
    const particles = particlesPool.get(),
        effect = effectPool.get();
    particles.offset.setVector(position);
    effect.start();
    /** @param {number} opacity */
    const update = opacity => {
        particles.items.forEach(particle => {
            particle.style.opacity = opacity;
        });
    };
    effect.on('update', update)
        .once('end', () => {
            scene.remove(particles)
                .disuse(effect);
            effect.off('update', update);
            particlesPool.add(particles);
            effectPool.add(effect);
        });
    scene.add(particles)
        .use(effect);
};
