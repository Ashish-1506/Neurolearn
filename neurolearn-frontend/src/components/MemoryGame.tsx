import { useState, useEffect, useMemo } from 'react';

interface MemoryGameProps {
    onGameComplete: () => void;
}

const EMOJIS = ['🍕', '🚀', '⭐', '🎈', '🎁', '🎉', '🐱', '🐶'];

const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

const MemoryGame = ({ onGameComplete }: MemoryGameProps) => {
    const [cards, setCards] = useState<string[]>([]);
    const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
    const [moves, setMoves] = useState(0);

    useEffect(() => {
        setCards(shuffleArray([...EMOJIS, ...EMOJIS]));
    }, []);

    const isCardFlipped = (index: number) => flippedIndices.includes(index);
    const isCardMatched = (card: string) => matchedPairs.includes(card);

    useEffect(() => {
        if (matchedPairs.length === EMOJIS.length) {
            const timer = setTimeout(() => {
                onGameComplete();
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [matchedPairs, onGameComplete]);

    useEffect(() => {
        if (flippedIndices.length < 2) return;

        const [firstIndex, secondIndex] = flippedIndices;
        const firstCard = cards[firstIndex];
        const secondCard = cards[secondIndex];

        if (firstCard === secondCard) {
            setMatchedPairs((prev) => [...prev, firstCard]);
            setFlippedIndices([]);
        } else {
            const timer = setTimeout(() => {
                setFlippedIndices([]);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [flippedIndices, cards]);

    const handleCardClick = (index: number) => {
        if (flippedIndices.length === 2 || isCardFlipped(index) || isCardMatched(cards[index])) {
            return;
        }
        
        if (flippedIndices.length === 0) {
            setFlippedIndices([index]);
        } else {
            setFlippedIndices((prev) => [...prev, index]);
            setMoves((prev) => prev + 1);
        }
    };

    const restartGame = () => {
        setCards(shuffleArray([...EMOJIS, ...EMOJIS]));
        setFlippedIndices([]);
        setMatchedPairs([]);
        setMoves(0);
    };

    const allMatched = useMemo(() => matchedPairs.length === EMOJIS.length, [matchedPairs]);

    return (
        <div className="relative w-full max-w-md mx-auto p-2 sm:p-4 bg-dark-panel/80 rounded-2xl shadow-glow-purple border border-dark-border flex flex-col items-center">
            <button
                onClick={onGameComplete}
                className="absolute top-2 right-2 text-text-primary bg-dark-panel/50 p-2 rounded-full hover:bg-dark-panel z-10"
                aria-label="Close game"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h1 className="text-2xl sm:text-3xl font-bold text-accent-purple mb-2 sm:mb-4" style={{ textShadow: '0 0 10px var(--neon-purple)' }}>
                Memory Game
            </h1>
            <div className="text-base sm:text-lg text-text-primary mb-2 sm:mb-4">Moves: {moves}</div>
            
            <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full mb-4 sm:mb-6" style={{ perspective: '1000px' }}>
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`aspect-square relative cursor-pointer transition-transform duration-700`}
                        style={{ transformStyle: 'preserve-3d', transform: isCardFlipped(index) || isCardMatched(card) ? 'rotateY(180deg)' : '' }}
                        onClick={() => handleCardClick(index)}
                    >
                        {/* Front of the card */}
                        <div className="absolute w-full h-full rounded-lg bg-dark-bg/70 border-2 border-dark-border" style={{ backfaceVisibility: 'hidden' }}></div>
                        {/* Back of the card */}
                        <div className="absolute w-full h-full flex items-center justify-center rounded-lg bg-accent-purple/90 border-2 border-accent-purple shadow-glow-purple" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                            <span className="text-3xl sm:text-4xl">{card}</span>
                        </div>
                    </div>
                ))}
            </div>

            {allMatched ? (
                <p className="text-xl sm:text-2xl text-accent-green font-bold">You won! Great job!</p>
            ) : (
                <button onClick={restartGame} className="bg-accent-purple text-white font-bold py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors">
                    Restart Game
                </button>
            )}
        </div>
    );
};

export default MemoryGame;
