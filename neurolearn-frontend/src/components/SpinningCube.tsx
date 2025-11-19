import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Float } from '@react-three/drei';
import { useRef } from 'react';
import { Mesh } from 'three';

interface SpinningCubeProps {
    isVisible: boolean;
    onClose: () => void;
}

const ARCube = () => {
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
            <mesh ref={meshRef} scale={1.5}>
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

const SpinningCube = ({ isVisible, onClose }: SpinningCubeProps) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="w-full h-full absolute inset-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <ambientLight intensity={0.8} />
                    <pointLight position={[10, 10, 10]} color="white" />
                    <ARCube />
                    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
                </Canvas>
            </div>
            <div className="relative text-center">
                <button 
                    onClick={onClose}
                    className="absolute top-[-6rem] right-[-8rem] text-text-primary bg-dark-panel/50 p-2 rounded-full hover:bg-dark-panel"
                    aria-label="Close brain break"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                 <p className="text-text-primary text-lg bg-dark-panel/50 p-2 rounded-lg">A quick brain break!</p>
            </div>
        </div>
    );
};

export default SpinningCube;
