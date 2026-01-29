'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, MeshDistortMaterial, Line, OrbitControls, Points, PointMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from 'next-themes';

interface GreenhouseProps {
  progress: number;
  color: string;
}

const Particles = ({ color, count = 100 }: { color: string, count?: number }) => {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 15;
      p[i * 3 + 1] = Math.random() * 8;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
    }
  });

  return (
    <Points ref={ref} positions={points}>
      <PointMaterial
        transparent
        color={color}
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const GreenhouseModel = ({ progress, color }: GreenhouseProps) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Stages of development: 0 to 1, 1 to 2, 2 to 3
  const stage = Math.floor(progress * 4);
  const stageProgress = (progress * 4) % 1;

  // Parameters for the greenhouse shape
  const params = useMemo(() => {
    let width = 4;
    let height = 2;
    let depth = 8;
    let roofHeight = 1;
    let sections = 5;

    if (progress < 0.25) {
      // Stage 0: Basic Innovative Agriculture
      width = 4;
      depth = 6 + stageProgress * 4;
      sections = 4 + Math.floor(stageProgress * 2);
    } else if (progress < 0.5) {
      // Stage 1: Industrial Complexes
      width = 4 + stageProgress * 4;
      depth = 10 + stageProgress * 10;
      sections = 6 + Math.floor(stageProgress * 10);
      height = 2 + stageProgress * 1;
    } else if (progress < 0.75) {
      // Stage 2: Smart Farming
      width = 8 - stageProgress * 5;
      depth = 20 - stageProgress * 12;
      sections = 16 - Math.floor(stageProgress * 10);
      height = 3 - stageProgress * 1;
      roofHeight = 1 + stageProgress * 0.5;
    } else {
      // Stage 3: Eco-Residential
      width = 3;
      depth = 8;
      sections = 4;
      height = 2.5;
      roofHeight = 1.5;
    }

    return { width, height, depth, roofHeight, sections };
  }, [progress, stageProgress]);

  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1 + progress * Math.PI * 0.5;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });

  const { lines, panels } = useMemo(() => {
    const { width, height, depth, roofHeight, sections } = params;
    const lineItems: React.ReactElement[] = [];
    const panelItems: React.ReactElement[] = [];
    const sectionStep = depth / (sections - 1);
    const roofSegments = 20;

    for (let i = 0; i < sections; i++) {
      const z = -depth / 2 + i * sectionStep;
      
      const roofPoints: [number, number, number][] = [];
      for (let j = 0; j <= roofSegments; j++) {
        const t = j / roofSegments;
        const x = -width / 2 + t * width;
        const y = height + Math.sin(Math.PI * t) * roofHeight;
        roofPoints.push([x, y, z]);
      }

      const points: [number, number, number][] = [
        [-width / 2, 0, z],
        ...roofPoints,
        [width / 2, 0, z],
      ];

      lineItems.push(
        <Line
          key={`rib-${i}`}
          points={points}
          color={color}
          lineWidth={2}
          transparent
          opacity={0.8}
        />
      );

      // Add a secondary inner line for a "thick" frame look
      const innerPoints: [number, number, number][] = points.map(p => [p[0] * 0.95, p[1] > 0 ? p[1] - 0.1 : 0, p[2]] as [number, number, number]);
      lineItems.push(
        <Line
          key={`rib-inner-${i}`}
          points={innerPoints}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
      );

      // Add major joint dots
      const dots = [
        [-width / 2, 0, z],
        [-width / 2, height, z],
        [0, height + roofHeight, z],
        [width / 2, height, z],
        [width / 2, 0, z],
      ];

      dots.forEach((p, j) => {
        lineItems.push(
          <mesh key={`dot-${i}-${j}`} position={p as [number, number, number]}>
            <boxGeometry args={[0.08, 0.08, 0.08]} />
            <meshBasicMaterial color={color} transparent opacity={0.8} />
          </mesh>
        );
      });

      // Add "glass" panels between ribs
      if (i < sections - 1) {
        const nextZ = z + sectionStep;
        
        // Add structural X-bracing to sides
        const bracingLines = [
          [[-width / 2, 0, z], [-width / 2, height, nextZ]],
          [[-width / 2, height, z], [-width / 2, 0, nextZ]],
          [[width / 2, 0, z], [width / 2, height, nextZ]],
          [[width / 2, height, z], [width / 2, 0, nextZ]],
        ];

        bracingLines.forEach((p, bidx) => {
          lineItems.push(
            <Line 
              key={`brace-side-${i}-${bidx}`}
              points={p as [number, number, number][]}
              color={color}
              lineWidth={0.5}
              transparent
              opacity={0.2}
            />
          );
        });

        // Add structural X-bracing to roof (more detail)
        const roofBracePositions = [0.1, 0.3, 0.5, 0.7, 0.9];
        roofBracePositions.forEach((t, bIdx) => {
          const t1 = Math.max(0, t - 0.1);
          const t2 = Math.min(1, t + 0.1);
          
          const x1 = -width / 2 + t1 * width;
          const y1 = height + Math.sin(Math.PI * t1) * roofHeight;
          const x2 = -width / 2 + t2 * width;
          const y2 = height + Math.sin(Math.PI * t2) * roofHeight;

          lineItems.push(
            <Line 
              key={`roof-brace-${i}-${bIdx}-1`}
              points={[[x1, y1, z], [x2, y2, nextZ]]}
              color={color}
              lineWidth={0.4}
              transparent
              opacity={0.15}
            />,
            <Line 
              key={`roof-brace-${i}-${bIdx}-2`}
              points={[[x2, y2, z], [x1, y1, nextZ]]}
              color={color}
              lineWidth={0.4}
              transparent
              opacity={0.15}
            />
          );
        });

        // Add internal support trusses for the arch
        if (i % 2 === 0) {
          const trussPoints: [number, number, number][] = [
            [-width / 2, height, z],
            [width / 2, height, z],
          ];
          lineItems.push(
            <Line 
              key={`truss-${i}`}
              points={trussPoints}
              color={color}
              lineWidth={1}
              transparent
              opacity={0.3}
            />
          );

          // Vertical struts from truss to arch
          [0.2, 0.4, 0.5, 0.6, 0.8].forEach((t, sIdx) => {
            const x = -width / 2 + t * width;
            const yArch = height + Math.sin(Math.PI * t) * roofHeight;
            lineItems.push(
              <Line 
                key={`strut-${i}-${sIdx}`}
                points={[[x, height, z], [x, yArch, z]]}
                color={color}
                lineWidth={0.6}
                transparent
                opacity={0.25}
              />
            );
          });
        }

        // Side panels
        const sidePanelCoords = [
          [[-width / 2, 0, z], [-width / 2, height, z], [-width / 2, height, nextZ], [-width / 2, 0, nextZ]], // Left
          [[width / 2, 0, z], [width / 2, height, z], [width / 2, height, nextZ], [width / 2, 0, nextZ]], // Right
        ];

        sidePanelCoords.forEach((coords, idx) => {
          panelItems.push(
            <mesh 
              key={`panel-side-${i}-${idx}`} 
              position={coords[0] as [number, number, number]} 
              rotation={[0, idx === 0 ? -Math.PI/2 : Math.PI/2, 0]}
            >
              <planeGeometry args={[sectionStep, height]} />
              <meshPhysicalMaterial 
                color={color} 
                transparent 
                opacity={0.05} 
                roughness={0} 
                metalness={0.5} 
                transmission={0.5}
                thickness={0.1}
              />
            </mesh>
          );
        });

        // Roof panels
        for (let j = 0; j < roofSegments; j++) {
          const t_mid = (j + 0.5) / roofSegments;
          const x_mid = -width / 2 + t_mid * width;
          const y_mid = height + Math.sin(Math.PI * t_mid) * roofHeight;
          
          const t1 = j / roofSegments;
          const t2 = (j + 1) / roofSegments;
          const x1 = -width / 2 + t1 * width;
          const x2 = -width / 2 + t2 * width;
          const y1 = height + Math.sin(Math.PI * t1) * roofHeight;
          const y2 = height + Math.sin(Math.PI * t2) * roofHeight;
          
          const dx = x2 - x1;
          const dy = y2 - y1;
          const segmentWidth = Math.sqrt(dx * dx + dy * dy);
          const angle = Math.atan2(dy, dx);

          panelItems.push(
            <group key={`panel-roof-${i}-${j}`} position={[x_mid, y_mid, z + sectionStep / 2]} rotation={[0, 0, angle]}>
               <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[segmentWidth, sectionStep]} />
                <meshPhysicalMaterial 
                  color={color} 
                  transparent 
                  opacity={0.03} 
                  roughness={0} 
                  metalness={0.2} 
                  transmission={0.8}
                />
              </mesh>
            </group>
          );
        }
      }
    }

    // Ridge and horizontal lines
    const horizontalPaths: [number, number, number][][] = [];
    
    // Base lines
    horizontalPaths.push(Array.from({ length: sections }, (_, i) => [-width / 2, 0, -depth / 2 + i * sectionStep] as [number, number, number]));
    horizontalPaths.push(Array.from({ length: sections }, (_, i) => [width / 2, 0, -depth / 2 + i * sectionStep] as [number, number, number]));
    
    // Roof lines (at specific intervals on the arch)
    const archLinesCount = 11;
    for (let k = 0; k < archLinesCount; k++) {
      const t = k / (archLinesCount - 1);
      const x = -width / 2 + t * width;
      const yOffset = Math.sin(Math.PI * t) * roofHeight;
      const y = height + yOffset;
      
      horizontalPaths.push(
        Array.from({ length: sections }, (_, i) => [x, y, -depth / 2 + i * sectionStep] as [number, number, number])
      );
    }

    horizontalPaths.forEach((points, i) => {
      lineItems.push(
        <Line
          key={`horiz-${i}`}
          points={points}
          color={color}
          lineWidth={1}
          transparent
          opacity={0.4}
        />
      );
    });

    // Add technical dimension lines around the model
    const dimOffset = 1.5;
    const groundY = -0.1;
    
    // Width dimension line
    lineItems.push(
      <group key="tech-dimensions">
        <Line 
          points={[[-width/2, groundY, depth/2 + dimOffset], [width/2, groundY, depth/2 + dimOffset]]}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
        {/* Depth dimension line */}
        <Line 
          points={[[width/2 + dimOffset, groundY, -depth/2], [width/2 + dimOffset, groundY, depth/2]]}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={0.3}
        />
        
        {/* Corner vertical markers */}
        {[[-width/2, -depth/2], [width/2, -depth/2], [-width/2, depth/2], [width/2, depth/2]].map((pos, idx) => (
          <Line 
            key={`corner-mark-${idx}`}
            points={[[pos[0], 0, pos[1]], [pos[0], groundY - 0.5, pos[1]]]}
            color={color}
            lineWidth={0.5}
            transparent
            opacity={0.2}
          />
        ))}
      </group>
    );

    return { lines: lineItems, panels: panelItems };
  }, [params, color]);

  const scanGroupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (scanGroupRef.current) {
      const z = (Math.sin(state.clock.getElapsedTime() * 1.5) * params.depth) / 2;
      scanGroupRef.current.position.z = z;
    }
  });

  return (
    <group ref={groupRef}>
      {lines}
      {panels}
      
      {/* Enhanced Scan line effect */}
      <group ref={scanGroupRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[params.width + 1.5, 0.15]} />
          <meshBasicMaterial color={color} transparent opacity={0.2} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <planeGeometry args={[params.width + 1.5, 0.03]} />
          <meshBasicMaterial color={color} transparent opacity={0.8} />
        </mesh>
      </group>
      
      {/* Floor grid */}
      <gridHelper args={[20, 20, color, color]} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

export default function Greenhouse3D({ progress, color }: GreenhouseProps) {
  const { resolvedTheme } = useTheme();
  const fogColor = resolvedTheme === 'dark' ? '#0a0a0a' : '#fafafa';

  return (
    <div className="w-full h-full bg-muted/10">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[12, 8, 12]} fov={35} />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2} 
        />
        
        <ambientLight intensity={resolvedTheme === 'dark' ? 0.4 : 0.7} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={resolvedTheme === 'dark' ? 1.5 : 1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Environment preset={resolvedTheme === 'dark' ? "night" : "city"} />
        
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <GreenhouseModel progress={progress} color={color} />
        </Float>
        
        <Particles color={color} count={200} />
        
        <fog attach="fog" args={[fogColor, 15, 35]} />
      </Canvas>
    </div>
  );
}
