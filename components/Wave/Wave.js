import './Wave.module.scss';
import * as THREE from 'three';
import dynamic from 'next/dynamic';
const OrbitControls = dynamic(
    import('three/examples/jsm/controls/OrbitControls'),
    { ssr: false }
);
import {
    Canvas,
    extend,
    useFrame,
    useLoader,
    useThree,
} from '@react-three/fiber';
import { Suspense, useCallback, useMemo, useRef } from 'react';
extend({ OrbitControls });

const DISTANCE = 3;

const circleImg = 'circle.png';

function CameraControls() {
    const {
        camera,
        gl: { domElement },
    } = useThree();

    const controlsRef = useRef();
    useFrame(() => controlsRef.current.update());

    return (
        <orbitControls
            ref={controlsRef}
            args={[camera, domElement]}
            autoRotate
            autoRotateSpeed={-0.2}
        />
    );
}

function Points() {
    const imgTex = useLoader(THREE.TextureLoader, circleImg);
    const bufferRef = useRef();

    let t = 0;
    let f = 0.002;
    let a = 6;
    const graph = useCallback(
        (x, z) => {
            return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
        },
        [t, f, a]
    );

    const count = 200;
    const sep = DISTANCE;
    let positions = useMemo(() => {
        let positions = [];

        for (let xi = 0; xi < count; xi++) {
            for (let zi = 0; zi < count; zi++) {
                let x = sep * (xi - count / 2);
                let z = sep * (zi - count / 2);
                let y = graph(x, z);
                positions.push(x, y, z);
            }
        }

        return new Float32Array(positions);
    }, [count, sep, graph]);

    useFrame(() => {
        t += 15;

        const positions = bufferRef.current.array;

        let i = 0;
        for (let xi = 0; xi < count; xi++) {
            for (let zi = 0; zi < count; zi++) {
                let x = sep * (xi - count / 2);
                let z = sep * (zi - count / 2);
                positions[i + 1] = graph(x, z);
                i += DISTANCE;
            }
        }

        bufferRef.current.needsUpdate = true;
    });

    return (
        <points>
            <bufferGeometry attach='geometry'>
                <bufferAttribute
                    ref={bufferRef}
                    attachObject={['attributes', 'position']}
                    array={positions}
                    count={positions.length / DISTANCE}
                    itemSize={DISTANCE}
                />
            </bufferGeometry>

            <pointsMaterial
                attach='material'
                map={imgTex}
                color={0x347fc4}
                size={0.7}
                sizeAttenuation
                transparent={false}
                alphaTest={0.5}
                opacity={0.8}
            />
        </points>
    );
}

function AnimationCanvas() {
    return (
        <Canvas
            colorManagement={false}
            camera={{ position: [90, 7, 0], fov: 90 }}>
            <Suspense fallback={null}>
                <Points />
            </Suspense>
            <CameraControls />
        </Canvas>
    );
}

function Wave() {
    return (
        <div className='anim'>
            <h1 style={{ color: 'red' }}>Hello, World!</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <AnimationCanvas />
            </Suspense>
        </div>
    );
}

export default Wave;
