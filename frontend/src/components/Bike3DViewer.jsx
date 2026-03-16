import { Canvas } from "@react-three/fiber";
import { useGLTF, Stage, PresentationControls, OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model(props) {
  return (
    <group {...props}>
      {/* Main Body */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2.2, 0.4, 0.6]} />
        <meshStandardMaterial color="#e71922" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Tank Area */}
      <mesh position={[-0.2, 0.5, 0]} castShadow>
        <capsuleGeometry args={[0.3, 0.6, 4, 18]} rotation={[0, 0, Math.PI / 2.5]} />
        <meshStandardMaterial color="#b91c1c" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Seat */}
      <mesh position={[-0.5, 0.45, 0]} castShadow>
        <boxGeometry args={[0.8, 0.1, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>
      
      {/* Front Fork */}
      <mesh position={[0.9, 0.1, 0]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 1.2, 16]} />
        <meshStandardMaterial color="#404040" metalness={0.9} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0.75, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 1, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      
      {/* Engine Area */}
      <mesh position={[0, -0.1, 0]} castShadow>
        <boxGeometry args={[0.6, 0.6, 0.5]} />
        <meshStandardMaterial color="#333" metalness={0.7} />
      </mesh>

      {/* Rear Wheel */}
      <mesh position={[-0.8, -0.4, 0]} castShadow>
        <torusGeometry args={[0.35, 0.12, 16, 100]} rotation={[0, Math.PI / 2, 0]} />
        <meshStandardMaterial color="#111" roughness={1} />
        {/* Rims */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.15, 6]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333" metalness={1} />
        </mesh>
      </mesh>

      {/* Front Wheel */}
      <mesh position={[1.15, -0.4, 0]} castShadow>
        <torusGeometry args={[0.35, 0.12, 16, 100]} rotation={[0, Math.PI / 2, 0]} />
        <meshStandardMaterial color="#111" roughness={1} />
        {/* Rims */}
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.15, 6]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#333" metalness={1} />
        </mesh>
      </mesh>
    </group>
  );
}

export default function Bike3DViewer() {
  return (
    <section className="py-24 bg-hero-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <h2 className="text-hero-red font-display font-bold tracking-[0.2em] mb-4 uppercase">Experience in 3D</h2>
            <h1 className="text-5xl md:text-7xl font-display font-black text-white mb-8 leading-tight">THE FUTURE OF <span className="text-hero-red">RIDING</span></h1>
            <p className="text-gray-400 text-xl leading-relaxed mb-10">
              Get closer than ever before. Explore every curve, every detail, and the engineering excellence of our flagship models in a full 360-degree immersive view.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-hero-red text-white font-bold py-4 px-10 rounded uppercase hover:bg-hero-red-light transition-all shadow-lg shadow-hero-red/20">
                Customize Color
              </button>
              <button className="border border-white/20 text-white font-bold py-4 px-10 rounded uppercase hover:bg-white/5 transition-all">
                View Tech Specs
              </button>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 h-[500px] bg-gradient-to-br from-hero-dark/50 to-hero-gray/30 rounded-3xl border border-white/5 shadow-inner relative cursor-grab active:cursor-grabbing">
            <div className="absolute top-6 left-6 z-10">
              <span className="bg-hero-red/10 text-hero-red text-xs font-bold px-3 py-1 rounded-full border border-hero-red/20 flex items-center gap-2">
                <span className="w-2 h-2 bg-hero-red rounded-full animate-pulse"></span>
                INTERACTIVE 3D
              </span>
            </div>
            
            <Canvas dpr={[1, 2]} shadows camera={{ fov: 45 }} position={[0, 0, 5]}>
              <color attach="background" args={['#0a0a0a']} />
              <Suspense fallback={null}>
                <Stage environment="city" intensity={0.5} contactShadow={true} shadowBias={-0.0015}>
                  <PresentationControls speed={1.5} global zoom={0.7} polar={[-0.1, Math.PI / 4]}>
                    <Model scale={1} />
                  </PresentationControls>
                </Stage>
              </Suspense>
              <OrbitControls enableZoom={false} autoRotate speed={0.5} />
            </Canvas>
            
            <div className="absolute bottom-6 right-6 text-gray-500 text-sm font-bold uppercase tracking-widest pointer-events-none">
              Drag to Rotate
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
