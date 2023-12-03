import * as THREE from 'three';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import changeTexture from './ModelChanger'
import { TextureLoader } from 'three';
import './ModelViewer.css'

//Mock
const modelHuman=['/models/HumanLv1.glb','/models/HumanLv2.glb'];
const modelDesk=['/models/DeskLv1.glb','/models/DeskLv2.glb'];
const modelPC=['/models/PCLv1.glb','/models/PCLv2.glb'];

const ModelLoader = ({Models}:{Models:{Human: number; Desk: number; PC: number; Floor: string;}}) => {

    const [Human,Desk,PC,Floor] = useLoader(GLTFLoader, [modelHuman[Models.Human-1],modelDesk[Models.Desk-1],modelPC[Models.PC-1],Models.Floor]); // モデルへのパスを指定
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
        Human:1,
        Desk:1,
        PC:1,
        Floor:'/models/Floor.glb'})
    
    useEffect(() => {
        // レベルに応じてモデルを更新
        if (Math.floor(level/10)%3 === 1) {
            if((Models.Human) in modelHuman){
            console.log('Hello');
            setModel({
                ...Models,
                Human: Models.Human+1
            })};
        }else if(Math.floor(level/10)%3 === 2){
            if((Models.Desk) in modelDesk){
            setModel({
                ...Models,
                Desk: Models.Desk+1
            })};
        }else if(Math.floor(level/10)!==0 && Math.floor(level/10)%3 === 0){
            if((Models.PC) in modelPC){
            setModel({
                ...Models,
                PC: Models.PC+1
            })};
        }
        // さらに高いレベルのモデル変更もここに追加
    }, [Math.floor(level/10)]);

    return (
        <div className='model-viewer-container'>
            <Canvas
            shadows={'basic'}
            camera={{fov: 45, near: 0.1, far: 1000, position: [0, 3, 15]}}
            className='canvas' 
            style={{ height:'80vh', backgroundImage:`url(/models/backgroundImage.png)`, borderRadius: "20px"}}>
                <ambientLight intensity={2} />
                <spotLight position={[0, 0, 10]}/>
                <OrbitControls autoRotate autoRotateSpeed={-2} />
                <ModelLoader Models={Models}/>
            </Canvas>
        </div>
    );
};

export default ModelViewer;
