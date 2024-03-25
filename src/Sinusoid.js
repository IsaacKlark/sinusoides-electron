import React, { useRef, useState } from 'react';
import { Canvas, useFrame, } from 'react-three-fiber';
import * as THREE from 'three';
import { Box, Slider, Typography } from '@mui/material';

const SinusoidFn = ({ numOfPoints, amplitude, scale, amountOfPeaks, period, color }) => {
  const lineRef = useRef();

  useFrame(({ camera }) => {
    camera.position.set(0, 0, scale);
    camera.updateProjectionMatrix();

    const positions = lineRef.current.geometry.attributes.position;
    if (positions) {
      const array = positions.array;
      for (let i = 0; i < numOfPoints; i++) {
        const x = (i / numOfPoints) * amountOfPeaks - amountOfPeaks / 2;
        const y = Math.sin(x * period) * amplitude;
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
  const material = new THREE.LineBasicMaterial({ color });

  return (
    <primitive ref={lineRef} object={new THREE.Line(geometry, material)} />
  );
};

const Sinusoid = () => {
  const [amplitude, setAmplitude] = useState([1, 2, 1.4, 4, 0.7, 3, 2.2, 3.3]);
  const [amountOfPeaks, setAmountOfPeaks] = useState([10000, 10000, 10000, 10000, 10000, 10000, 10000, 10000]);
  const [period, setPeriod] = useState([2, 1, 3.3, 4, 1.3, 3, 2, 2.3]);
  const [scale, setScale] = useState(15);
  const [numberOfPoints, setNumberOfPoints] = useState([60000, 60000, 60000, 90000, 60000, 60000, 60000, 60000,]);

  const color = ['gold', '#d57373', '#faabfa', 'lightblue', 'white', '#9ef49e', 'orange', '#eacaca'];

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: "650px"
    }}>
      <Canvas style={{ background: 'black', height: '650px', width: "650px", borderRadius: '10px' }} camera={{ position: [0, 0, scale], far: 10000 }}>
        {
          amplitude.map((el, index) => (
            <SinusoidFn
              key={index}
              numOfPoints={numberOfPoints[index]}
              amplitude={amplitude[index]}
              scale={scale}
              amountOfPeaks={amountOfPeaks[index]}
              period={period[index]}
              color={color[index]}
            />
          ))
        }
      </Canvas>
      {
        amplitude.map((el, index) => (
          <Box sx={{ background: color[index], padding: '20px', width: '610px' }} key={index}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: "100%"
            }}>
              <Slider
                aria-label="Default"
                valueLabelDisplay="auto"
                min={0}
                max={100}
                value={amplitude[index]}
                step={0.01}
                onChange={(e) => {
                  const copyAmplitude = [...amplitude];
                  copyAmplitude[index] = e.target.value;
                  setAmplitude(copyAmplitude);
                }}
              />
              <Typography>amplitude: {amplitude[index]}</Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: "100%"
            }}>
              <Slider
                aria-label="Default"
                valueLabelDisplay="auto"
                min={0}
                max={10}
                value={period[index]}
                step={0.1}
                onChange={(e) => {
                  const copyPeriod = [...period];
                  copyPeriod[index] = e.target.value;
                  setPeriod(copyPeriod);
                }}
              />
              <Typography>period: {period[index]}</Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: "100%"
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
              width: "100%"
            }}>
              <Slider
                aria-label="Default"
                valueLabelDisplay="auto"
                min={100}
                max={30000}
                value={amountOfPeaks[index]}
                step={1}
                onChange={(e) => {
                  const copyAmountOfPeaks = [...amountOfPeaks];
                  copyAmountOfPeaks[index] = e.target.value;
                  setAmountOfPeaks(copyAmountOfPeaks);
                }}
              />
              <Typography>amount of peaks: {amountOfPeaks[index]}</Typography>
            </Box>

            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: "100%"
            }}>
              <Slider
                aria-label="Default"
                valueLabelDisplay="auto"
                min={100}
                max={90000}
                value={numberOfPoints[index]}
                step={1}
                onChange={(e) => {
                  const copyNumberOfPoints = [...numberOfPoints];
                  copyNumberOfPoints[index] = e.target.value;
                  setNumberOfPoints(copyNumberOfPoints)
                }}
              />
              <Typography>number of points: {numberOfPoints[index]}</Typography>
            </Box>
          </Box>
        ))
      }
    </Box>

  );
};

export default Sinusoid;