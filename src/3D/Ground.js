import { MeshReflectorMaterial } from "@react-three/drei"
import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect } from "react"
import { LinearEncoding, RepeatWrapping, TextureLoader } from "three"

const Ground = () => {
    // fetching textures
    const [roughness, normal] = useLoader(TextureLoader, [
        process.env.PUBLIC_URL + "textures/terrain-roughness.jpg",
        process.env.PUBLIC_URL + "textures/terrain-normal.jpg",
    ])

    useEffect(() => {
        [roughness,normal].forEach((t) => {
            t.wrapS = RepeatWrapping;
            t.wrapT = RepeatWrapping;
            t.repeat.set(5,5);
        })

        normal.encoding = LinearEncoding;

    }, [roughness, normal])

    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 0.128;
        normal.offset.set(0, t);
        roughness.offset.set(0, t);
    })

    return (
        <> 
            <mesh rotation-x={-Math.PI * 0.5} castShadow recieveShadow>
                <planeGeometry args={[30,30]} />
                <MeshReflectorMaterial 
                    envMapIntensity={0}
                    normalMap={normal}
                    roughnessMap={roughness}
                    dithering={true}
                    color={[0.015, 0.015, 0.015]}
                    roughness={0.7}
                    blur={[1000, 400]}
                    mixBlur={30}
                    mixStrength={80}
                    mixContrast={1}
                    resolution={1024}
                    mirror={0}
                    depthScale={0.01}
                    minDepthThreshold={0.9}
                    maxDepthThreshold={1}
                    depthToBlurRatioBias={0.25}
                    debug={0}
                    reflectorOffset={0.2}
                />
            </mesh>
        </>
    )
}

export default Ground
