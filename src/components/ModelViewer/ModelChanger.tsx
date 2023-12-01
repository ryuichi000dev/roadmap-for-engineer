import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

interface ModelPaths {
    Human: string;
    Desk: string;
    PC: string;
    Floor: string;
  }
  

const changeTexture = (
    {Models}:{Models:{Human: string; Desk: string; PC: string; Floor: string;}},
    setModel:React.Dispatch<React.SetStateAction<ModelPaths>>,
    arg:{[key: string]: string;}
    ) => {
    setModel({...Models,...arg})
    };

export default changeTexture