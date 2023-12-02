import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import changeTexture from './ModelChanger'
import { TextureLoader } from 'three';

const ModelLoader = ({Models}:{Models:{Human: string; Desk: string; PC: string; Floor: string;}}) => {
    const [Human,Desk,PC,Floor] = useLoader(GLTFLoader, [Models.Human,Models.Desk,Models.PC,Models.Floor]); // モデルへのパスを指定
    return(
    <>
        <primitive object={Human.scene} />
        <primitive object={Desk.scene} />
        <primitive object={PC.scene} />
        <primitive object={Floor.scene} />
        <AnimeModel glb={Human} />
    </>
    );
};

const AnimeModel: React.FC<{glb:GLTF}> = ({ glb }) => {
    const modelRef = useRef<THREE.Object3D>();
    const mixer = new THREE.AnimationMixer(glb.scene);
    const action = mixer.clipAction(glb.animations[0]);

    useEffect(() => {
        action.play();
    }, [action]);

    useFrame((state, delta) => {
        mixer.update(delta);
    });

    return <primitive object={glb.scene} ref={modelRef} />;
};

const ModelViewer = ({ level }: { level: number }) => {
    const [Models,setModel]=useState({
        Human:'/models/HumanLv1.glb',
        Desk:'/models/DeskLv1.glb',
        PC:'/models/PCLv1.glb',
        Floor:'/models/Floor.glb'})
    
    useEffect(() => {
        // レベルに応じてモデルを更新
        if (level >= 10) {
            setModel({
                ...Models,
                Human: '/models/HumanLv2.glb',
                Desk: '/models/DeskLv2.glb'
                // 他のモデルも必要に応じて更新
            });
        }
        // さらに高いレベルのモデル変更もここに追加
    }, [level]);
        
    return (
        <div className='model-viewer-container'>
            <Canvas 
            shadows={'basic'}
            camera={{fov: 45, near: 0.1, far: 1000, position: [0, 3, 10]}} 
            style={{ backgroundImage:`url(/models/backgroundImage.png)` }}>
                <ambientLight intensity={2} />
                <spotLight position={[0, 0, 10]}/>
                <OrbitControls autoRotate autoRotateSpeed={-2} />
                <ModelLoader Models={Models}/>
            </Canvas>
            <button onClick={()=>changeTexture({Models},setModel,{Human:'/models/HumanLv2.glb'})}>Mock:Human</button>
            <button onClick={()=>changeTexture({Models},setModel,{Desk:'/models/DeskLv2.glb'})}>Mock:Desk</button>
        </div>
    );
};

export default ModelViewer;
