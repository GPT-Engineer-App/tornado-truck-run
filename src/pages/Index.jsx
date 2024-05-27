import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Text, VStack, Button, IconButton, Image, HStack } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Index = () => {
  const [truckPosition, setTruckPosition] = useState({ x: 50, y: 50 });
  const [tornadoPosition, setTornadoPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const gameAreaRef = useRef(null);

  const moveTruck = (direction) => {
    setTruckPosition((prev) => {
      let newX = prev.x;
      let newY = prev.y;
      if (direction === "up") newY = Math.max(prev.y - 10, 0);
      if (direction === "down") newY = Math.min(prev.y + 10, 90);
      if (direction === "left") newX = Math.max(prev.x - 10, 0);
      if (direction === "right") newX = Math.min(prev.x + 10, 90);
      return { x: newX, y: newY };
    });
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
    const dx = truckPosition.x - tornadoPosition.x;
    const dy = truckPosition.y - tornadoPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 10) {
      alert(`Game Over! Your score: ${score}`);
      setScore(0);
      setTruckPosition({ x: 50, y: 50 });
      setTornadoPosition({ x: 0, y: 0 });
    }
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
        <Box ref={gameAreaRef} position="relative" width="300px" height="300px" border="1px solid black">
          <Box position="absolute" width="30px" height="30px" bg="blue" style={{ left: `${truckPosition.x}%`, top: `${truckPosition.y}%` }} />
          <Box position="absolute" width="30px" height="30px" bg="red" style={{ left: `${tornadoPosition.x}%`, top: `${tornadoPosition.y}%` }} />
        </Box>
        <VStack>
          <IconButton aria-label="Up" icon={<FaArrowUp />} onClick={() => moveTruck("up")} />
          <HStack>
            <IconButton aria-label="Left" icon={<FaArrowLeft />} onClick={() => moveTruck("left")} />
            <IconButton aria-label="Right" icon={<FaArrowRight />} onClick={() => moveTruck("right")} />
          </HStack>
          <IconButton aria-label="Down" icon={<FaArrowDown />} onClick={() => moveTruck("down")} />
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
