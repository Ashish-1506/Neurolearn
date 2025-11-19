import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Line, Tube, Sphere, Text, Float } from '@react-three/drei';
import { MathUtils, Vector3, CatmullRomCurve3 } from 'three';

// --- Biology: DNA Helix ---
const DNAStrand = ({ color, rotationZ }: { color: string, rotationZ: number }) => {
    const points = [];
    for (let i = 0; i < 20; i++) {
        points.push(new Vector3(
            Math.sin(i * 0.5) * 0.5,
            i * 0.2 - 2,
            Math.cos(i * 0.5) * 0.5
        ));
    }
    const curve = new CatmullRomCurve3(points);

    return (
        <group rotation-z={rotationZ}>
            <Tube args={[curve, 20, 0.02, 8, false]} >
                <meshStandardMaterial attach="material" color={color} emissive={color} emissiveIntensity={0.4} />
            </Tube>
        </group>
    );
};

const DNAAnimation = () => {
    const groupRef = useRef<any>();
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });
    return (
        <group ref={groupRef}>
            <DNAStrand color="#61dafb" rotationZ={0} />
            <DNAStrand color="#ff69b4" rotationZ={Math.PI} />
            {/* Connectors */}
            {Array.from({ length: 10 }).map((_, i) => (
                 <Line
                    key={i}
                    points={[
                        [Math.sin(i * 1) * 0.5, i * 0.4 - 2 + 0.2, Math.cos(i * 1) * 0.5],
                        [Math.sin(i * 1 + Math.PI) * 0.5, i * 0.4 - 2 + 0.2, Math.cos(i * 1 + Math.PI) * 0.5]
                    ]}
                    color="white"
                    lineWidth={1}
                />
            ))}
        </group>
    );
};


// --- Physics: Atom ---
const AtomAnimation = () => {
    const groupRef = useRef<any>();
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.x += 0.005;
            groupRef.current.rotation.y += 0.007;
        }
    });
    return (
        <group ref={groupRef}>
            <Sphere args={[0.3, 16, 16]}>
                <meshStandardMaterial color="#ff416c" emissive="#ff416c" emissiveIntensity={0.6} />
            </Sphere>
            {[...Array(3)].map((_, i) => (
                <group key={i} rotation-z={Math.PI * (i / 3)} rotation-x={Math.PI * (i / 4)}>
                     <Line
                        points={Array.from({ length: 64 }, (_, j) => [
                            Math.sin(j / 10) * (1 + i * 0.2),
                            0,
                            Math.cos(j / 10) * (1 + i * 0.2)
                        ])}
                        color="white"
                        lineWidth={1}
                    />
                </group>
            ))}
        </group>
    );
};

// --- Psychology: Neural Network ---
const NeuralNetworkAnimation = () => {
    const nodes = [
        { pos: [-2, 0, 0], color: '#8a2be2' },
        { pos: [-1, 1, 0], color: '#ff69b4' },
        { pos: [-1, -1, 0], color: '#ff69b4' },
        { pos: [0, 0, 0], color: '#61dafb' },
        { pos: [1, 1, 0], color: '#ff69b4' },
        { pos: [1, -1, 0], color: '#ff69b4' },
        { pos: [2, 0, 0], color: '#8a2be2' },
    ];
    const connections = [
        [0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5], [4, 6], [5, 6]
    ];
    return (
        <group>
            {nodes.map((node, i) => (
                <Sphere key={i} args={[0.15, 16, 16]} position={node.pos as any}>
                    <meshStandardMaterial color={node.color} emissive={node.color} emissiveIntensity={0.5} />
                </Sphere>
            ))}
            {connections.map(([start, end], i) => (
                <Line
                    key={i}
                    points={[nodes[start].pos, nodes[end].pos] as any}
                    color="rgba(255, 255, 255, 0.5)"
                    lineWidth={1}
                />
            ))}
        </group>
    );
};

// --- Calculus: Sine Wave ---
const SineWaveAnimation = () => {
    const points = [];
    for (let i = -5; i <= 5; i += 0.2) {
        points.push(new Vector3(i, Math.sin(i), 0));
    }
    const curve = new CatmullRomCurve3(points);
    return (
        <group>
            <Tube args={[curve, 64, 0.05, 8, false]}>
                <meshStandardMaterial color="#39ff14" emissive="#39ff14" emissiveIntensity={0.5} />
            </Tube>
            {/* Axes */}
            <Line points={[[-5, 0, 0], [5, 0, 0]]} color="white" lineWidth={1} />
            <Line points={[[0, -2, 0], [0, 2, 0]]} color="white" lineWidth={1} />
        </group>
    );
};

// --- Art History: Abstract Sculpture ---
const SculptureAnimation = () => {
    const groupRef = useRef<any>();
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.y += 0.01;
        }
    });
    return (
        <group ref={groupRef}>
            <Float>
                <Sphere args={[0.5, 16, 16]} position={[0, 0.5, 0]}>
                    <meshStandardMaterial color="#ffd700" wireframe />
                </Sphere>
                <Sphere args={[0.3, 16, 16]} position={[1, 0, 0]}>
                    <meshStandardMaterial color="#c0c0c0" wireframe />
                </Sphere>
                 <Sphere args={[0.4, 16, 16]} position={[-0.5, -0.8, 0.5]}>
                    <meshStandardMaterial color="#b87333" wireframe />
                </Sphere>
            </Float>
        </group>
    );
};

// --- CS: AI ---
const AIAnimation = () => {
    const groupRef = useRef<any>();
    useFrame(() => {
        if (groupRef.current) {
            groupRef.current.rotation.z += 0.005;
        }
    });
    return (
        <group ref={groupRef}>
            <Text color="cyan" fontSize={0.5} position={[0, 0, 0.1]}>
                {'{}'}
            </Text>
            <Text color="lime" fontSize={1.5} position={[0.8, 0.8, -0.1]}>
                1
            </Text>
            <Text color="orange" fontSize={1.5} position={[-0.8, -0.8, -0.1]}>
                0
            </Text>
        </group>
    );
};


const animations: { [key: string]: React.ComponentType } = {
    'biology-101': DNAAnimation,
    'physics-motion': AtomAnimation,
    'psychology-memory': NeuralNetworkAnimation,
    'calculus-limits': SineWaveAnimation,
    'art-history-renaissance': SculptureAnimation,
    'cs-ai-fundamentals': AIAnimation,
};

interface CourseAnimationProps {
    courseId: string;
}

const CourseAnimation = ({ courseId }: CourseAnimationProps) => {
    const AnimationComponent = animations[courseId] || (() => null);

    return (
        <div className="w-full h-40 bg-dark-bg">
            <Canvas camera={{ position: [0, 0, 3.5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <React.Suspense fallback={null}>
                    <AnimationComponent />
                </React.Suspense>
            </Canvas>
        </div>
    );
};

export default CourseAnimation;
