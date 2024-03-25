import React, { useRef, useState } from 'react';
import { Canvas, useFrame, } from 'react-three-fiber';
import * as THREE from 'three';
import { Box, Slider, Typography } from '@mui/material';

const SinusoidFn = ({ numOfPoints, amplitude, scale, amountOfPeaks }) => {
  const lineRef = useRef();

  useFrame(({ camera }) => {
    camera.position.set(0, 0, scale);
    camera.updateProjectionMatrix();

    const positions = lineRef.current.geometry.attributes.position;
    if (positions) {
      const array = positions.array;
      for (let i = 0; i < numOfPoints; i++) {
        const x = (i / numOfPoints) * amountOfPeaks - amountOfPeaks / 2;
        const y = Math.sin(x * 3) * amplitude;
        array[i * 3] = x;
        array[i * 3 + 1] = y;
        array[i * 3 + 2] = 0;
      }
      positions.needsUpdate = true;
    }
  });

  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(numOfPoints * 3);
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.LineBasicMaterial({ color: 'white' });

  return (
    <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />
  );
};

const Sinusoid = ({ _amplitude }) => {
  const [amplitude, setAmplitude] = useState(_amplitude);
  const [amountOfPeaks, setAmountOfPeaks] = useState(10000);
  const [scale, setScale] = useState(15);
  const [numberOfPoints, setNumberOfPoints] = useState(30000);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: "650px"
    }}>
      <Canvas style={{ background: 'black', height: '650px', width: "650px", borderRadius: '10px' }} camera={{ position: [0, 0, scale], far: 10000 }}>
        <SinusoidFn numOfPoints={numberOfPoints} amplitude={amplitude} scale={scale} amountOfPeaks={amountOfPeaks} />
      </Canvas>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "650px"
      }}>
        <Slider
          aria-label="Default"
          valueLabelDisplay="auto"
          min={0}
          max={100}
          value={amplitude}
          step={0.01}
          onChange={(e) => {
            setAmplitude(e.target.value)
          }}
        />
        <Typography>amplitude: {amplitude}</Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "650px"
      }}>
        <Slider
          aria-label="Default"
          valueLabelDisplay="auto"
          min={0}
          max={10000}
          value={scale}
          step={1}
          onChange={(e) => {
            setScale(e.target.value)
          }}
        />
        <Typography>distance: {scale}</Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "650px"
      }}>
        <Slider
          aria-label="Default"
          valueLabelDisplay="auto"
          min={100}
          max={30000}
          value={amountOfPeaks}
          step={1}
          onChange={(e) => {
            setAmountOfPeaks(e.target.value)
          }}
        />
        <Typography>amount of peaks: {amountOfPeaks}</Typography>
      </Box>


      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "650px"
      }}>
        <Slider
          aria-label="Default"
          valueLabelDisplay="auto"
          min={100}
          max={90000}
          value={numberOfPoints}
          step={1}
          onChange={(e) => {
            setNumberOfPoints(e.target.value)
          }}
        />
        <Typography>number of points: {numberOfPoints}</Typography>
      </Box>
    </Box>

  );
};

export default Sinusoid;