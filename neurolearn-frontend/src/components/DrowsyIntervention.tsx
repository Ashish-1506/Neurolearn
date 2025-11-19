import { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { Float } from '@react-three/drei';
import MemoryGame from './MemoryGame';

const ARCube = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<Mesh>(null!);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <Float
            speed={2}
            rotationIntensity={0.5}
            floatIntensity={0.5}
        >
            <mesh ref={meshRef} position={position} scale={1.5}>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial
                    color={'#8a2be2'}
                    transparent
                    opacity={0.8}
                    wireframe
                />
            </mesh>
        </Float>
    );
};

interface DrowsyInterventionProps {
    isDrowsy: boolean;
    onClose: () => void;
    onGameComplete: () => void;
}

const getRandomPosition = (): [number, number, number] => {
    const x = (Math.random() - 0.5) * 30; // Increased spread on X-axis
    const y = (Math.random() - 0.5) * 20; // Increased spread on Y-axis
    const z = (Math.random() - 0.5) * 15; // Increased depth
    return [x, y, z];
};

const DrowsyIntervention = ({ isDrowsy, onClose, onGameComplete }: DrowsyInterventionProps) => {
    const [cubes, setCubes] = useState<[number, number, number][]>([]);
    const [isFilling, setIsFilling] = useState(false);
    const [showGameOption, setShowGameOption] = useState(false);
    const [playGame, setPlayGame] = useState(false);
    const hasSpokenRef = useRef(false);

    useEffect(() => {
        if (isDrowsy) {
            setIsFilling(true);
            setCubes([getRandomPosition()]); // Start with one cube
            hasSpokenRef.current = false; // Reset speech flag

            const cubeInterval = setInterval(() => {
                setCubes(prevCubes => [...prevCubes, getRandomPosition()]);
            }, 200);

            const stopFillingTimeout = setTimeout(() => {
                clearInterval(cubeInterval);
                setIsFilling(false);
                setShowGameOption(true);
            }, 5000);

            return () => {
                clearInterval(cubeInterval);
                clearTimeout(stopFillingTimeout);
            };
        } else {
            setCubes([]);
            setIsFilling(false);
            setShowGameOption(false);
            setPlayGame(false);
        }
    }, [isDrowsy]);

    useEffect(() => {
        if (showGameOption && !hasSpokenRef.current) {
            const utterance = new SpeechSynthesisUtterance("Let's play a small game to gain focus again");
            window.speechSynthesis.speak(utterance);
            hasSpokenRef.current = true;
        }
    }, [showGameOption]);

    const handleGameStart = () => {
        setPlayGame(true);
        setShowGameOption(false);
        setCubes([]); // Clear cubes when game starts
    };

    const handleGameEnd = () => {
        setPlayGame(false);
        onGameComplete();
    };

    if (!isDrowsy && cubes.length === 0 && !playGame && !showGameOption) return null;

    if (playGame) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md flex items-center justify-center z-50">
                <MemoryGame onGameComplete={handleGameEnd} />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
            <button
                onClick={onGameComplete}
                className="absolute top-4 right-4 text-text-primary bg-dark-panel/50 p-2 rounded-full hover:bg-dark-panel z-10"
                aria-label="Close"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {cubes.length > 0 && (
                <div className="w-full h-full absolute inset-0">
                    <Canvas camera={{ position: [0, 0, 15], fov: 75 }}>
                        <ambientLight intensity={0.8} />
                        <pointLight position={[10, 10, 10]} color="white" />
                        {cubes.map((pos, i) => (
                            <ARCube key={i} position={pos} />
                        ))}
                    </Canvas>
                </div>
            )}
            <div className="relative text-center">
                {showGameOption ? (
                    <div className="bg-dark-panel/80 p-6 rounded-lg shadow-glow-blue">
                        <p className="text-text-primary text-xl mb-4">Ready for a challenge?</p>
                        <button
                            onClick={handleGameStart}
                            className="bg-accent-blue text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Play Memory Game
                        </button>
                    </div>
                ) : (
                    isDrowsy && <p className="text-text-primary text-lg bg-dark-panel/50 p-2 rounded-lg">
                        {isFilling ? "Waking you up..." : "Take a short break!"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default DrowsyIntervention;
