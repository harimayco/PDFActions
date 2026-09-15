/**
 * Fireworks & Confetti Celebration Animations for PDFActions
 * Uses canvas-confetti with high z-index and vibrant claymorphism palette
 */

export const triggerFireworks = (durationMs = 2500) => {
  if (typeof window === "undefined") return;

  import("canvas-confetti")
    .then((module) => {
      const confetti = module.default || module;
      const animationEnd = Date.now() + durationMs;
      const defaults = {
        startVelocity: 35,
        spread: 360,
        ticks: 80,
        zIndex: 99999,
        shapes: ["circle", "square"],
        colors: [
          "#3B82F6", // Clay Blue
          "#10B981", // Clay Green
          "#F59E0B", // Amber
          "#EC4899", // Pink
          "#8B5CF6", // Purple
          "#06B6D4", // Cyan
          "#F43F5E", // Rose
        ],
      };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      // 1. Initial celebratory center launch
      confetti({
        ...defaults,
        particleCount: 90,
        spread: 120,
        origin: { y: 0.65 },
      });

      // 2. Continuous fireworks rockets exploding across top & sides
      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 40 * (timeLeft / durationMs);

        // Left firework rocket burst
        confetti({
          ...defaults,
          particleCount: Math.floor(particleCount),
          origin: { x: randomInRange(0.15, 0.35), y: Math.random() * 0.35 + 0.1 },
        });

        // Right firework rocket burst
        confetti({
          ...defaults,
          particleCount: Math.floor(particleCount),
          origin: { x: randomInRange(0.65, 0.85), y: Math.random() * 0.35 + 0.1 },
        });

        // Center-mid rocket burst
        confetti({
          ...defaults,
          particleCount: Math.floor(particleCount * 0.8),
          origin: { x: randomInRange(0.4, 0.6), y: Math.random() * 0.3 + 0.15 },
        });
      }, 260);
    })
    .catch((err) => {
      console.warn("Could not trigger fireworks animation:", err);
    });
};

export const triggerConfettiBurst = () => {
  if (typeof window === "undefined") return;

  import("canvas-confetti")
    .then((module) => {
      const confetti = module.default || module;
      const count = 150;
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 99999,
        colors: ["#3B82F6", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6"],
      };

      function fire(particleRatio, opts) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        });
      }

      fire(0.25, { spread: 26, startVelocity: 55 });
      fire(0.2, { spread: 60 });
      fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
      fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
      fire(0.1, { spread: 120, startVelocity: 45 });
    })
    .catch((err) => {
      console.warn("Could not trigger confetti burst:", err);
    });
};

export default triggerFireworks;
