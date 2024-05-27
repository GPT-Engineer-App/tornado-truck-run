import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Text, VStack, IconButton, Image, HStack } from "@chakra-ui/react";
import { FaArrowUp, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import sonicImage from "../assets/sonic.png";
import ringImage from "../assets/ring.png";

const Index = () => {
  const [truckPosition, setTruckPosition] = useState({ x: 50, y: 50 });
  const [tornadoPosition, setTornadoPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [rings, setRings] = useState([
    { x: 20, y: 50 },
    { x: 70, y: 30 },
  ]);
  const gameAreaRef = useRef(null);

  const moveTruck = (direction) => {
    if (jumping) return;
    setTruckPosition((prev) => {
      let newX = prev.x;
      if (direction === "left") newX = Math.max(prev.x - 10, 0);
      if (direction === "right") newX = Math.min(prev.x + 10, 90);
      return { x: newX, y: prev.y };
    });
  };

  const jumpTruck = () => {
    if (jumping) return;
    setJumping(true);
    setTimeout(() => setJumping(false), 500);
  };

  const moveTornado = () => {
    setTornadoPosition((prev) => {
      let newX = prev.x + Math.random() * 10 - 5;
      let newY = prev.y + Math.random() * 10 - 5;
      newX = Math.max(0, Math.min(newX, 90));
      newY = Math.max(0, Math.min(newY, 90));
      return { x: newX, y: newY };
    });
  };

  const checkCollision = () => {
    rings.forEach((ring, index) => {
      const dx = truckPosition.x - ring.x;
      const dy = truckPosition.y - ring.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 5) {
        setRings((prev) => prev.filter((_, i) => i !== index));
        setScore((prev) => prev + 10);
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      moveTornado();
      setScore((prev) => prev + 1);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    checkCollision();
  }, [truckPosition, tornadoPosition]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Truck vs Tornado</Text>
        <Text>Score: {score}</Text>
        <Box ref={gameAreaRef} position="relative" width="300px" height="300px" border="1px solid black" bg="green.100">
          <Box position="absolute" width="30px" height="30px" style={{ left: `${truckPosition.x}%`, top: `${truckPosition.y}%` }}>
            <Image src={sonicImage} alt="Sonic" />
          </Box>
          {rings.map((ring, index) => (
            <Box key={index} position="absolute" width="20px" height="20px" style={{ left: `${ring.x}%`, top: `${ring.y}%` }}>
              <Image src={ringImage} alt="Ring" />
            </Box>
          ))}
        </Box>
        <VStack>
          <IconButton aria-label="Up" icon={<FaArrowUp />} onClick={() => moveTruck("up")} />
          <HStack>
            <IconButton aria-label="Left" icon={<FaArrowLeft />} onClick={() => moveTruck("left")} />
            <IconButton aria-label="Right" icon={<FaArrowRight />} onClick={() => moveTruck("right")} />
          </HStack>
          <IconButton aria-label="Jump" icon={<FaArrowUp />} onClick={jumpTruck} />
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
