import { Suspense } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Ground from './3D/Ground';
import Car from './3D/Car';
import Rings from './3D/Rings';
import {Boxes} from './3D/Boxes';
// import Boxes from './3D/Boxes';

import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing'
import FloatingGrid from './3D/FloatingGrid';

function CarBox() {
  return(
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault position={[3,2,5]} fov={50} />

      <color args={[0, 0, 0]} attach="background"/>

      <CubeCamera resolution={256} frames={Infinity}>
        {
          (texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )
        }  
      </CubeCamera>

      <Rings />
      <Boxes />
      <FloatingGrid />  

      <spotLight
        color={[1,0.25,0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5,5,0]}
        castShadow={true}
        // shadow-bias={-0.0001}
        shadow-camera-far={0}
      />

      <spotLight
        color={[0.14,0.5,1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5,5,0]}
        castShadow={true}
        shadow-camera-far={0}
        // shadow-bias={-0.0001}
      />

      <Ground />

      <EffectComposer>
          <Bloom 
            blendFunction={BlendFunction.ADD}
            intensity={0.6}
            width={300}
            height={300}
            kernelSize={5}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.025}
          />
          <ChromaticAberration 
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0012]}
          />
      </EffectComposer>
    </>
  )
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarBox />
      </Canvas>
    </Suspense>
  );
}

export default App;
