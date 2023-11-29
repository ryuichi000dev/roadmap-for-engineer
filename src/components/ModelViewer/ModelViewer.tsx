import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

const Model = () => {
    const glb = useLoader(GLTFLoader, '/models/supporters.glb'); // モデルへのパスを指定

    return <primitive object={glb.scene} />;
};

const ModelViewer = () => {
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 15, 10]} angle={0.3} />
                <OrbitControls />
                <Model />
            </Canvas>
        </div>
    );
};

export default ModelViewer;
