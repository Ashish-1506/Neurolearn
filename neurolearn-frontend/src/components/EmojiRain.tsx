import { motion } from 'framer-motion';

const EMOJIS = ['🤔', '💡', '📚', '🧠', '🎯', '🔥', '⭐'];

const EmojiRain = ({ isActive }: { isActive: boolean }) => {
    if (!isActive) return null;

    return (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => {
                const duration = Math.random() * 5 + 3; // 3 to 8 seconds
                const delay = Math.random() * 5;
                const xStart = Math.random() * 100;
                const xEnd = xStart + (Math.random() - 0.5) * 40;

                return (
                    <motion.div
                        key={i}
                        className="absolute text-2xl"
                        style={{
                            top: '-5%',
                            left: `${xStart}%`,
                            opacity: Math.random() * 0.5 + 0.5,
                        }}
                        animate={{
                            y: '105vh',
                            x: [`${xStart}%`, `${xEnd}%`],
                            rotate: Math.random() * 360,
                        }}
                        transition={{
                            duration,
                            delay,
                            repeat: Infinity,
                            repeatType: 'loop',
                            ease: 'linear',
                        }}
                    >
                        {EMOJIS[i % EMOJIS.length]}
                    </motion.div>
                );
            })}
        </div>
    );
};

export default EmojiRain;
