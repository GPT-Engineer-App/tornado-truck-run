import React, { useState, useEffect, useRef } from "react";
import { Box, Container, Text, VStack, IconButton, Image, HStack, Flex } from "@chakra-ui/react";
import { FaArrowUp, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import sonicImage from "../assets/sonic.png";
import ringImage from "../assets/ring.png";

const Index = () => {
  const [truckPosition, setTruckPosition] = useState({ x: 50, y: 80 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [jumping, setJumping] = useState(false);
  const [rings, setRings] = useState([
    { x: 20, y: 50 },
    { x: 70, y: 30 },
  ]);
  const gameAreaRef = useRef(null);

  const gravity = 0.5;
  const jumpStrength = -10;
  const moveSpeed = 5;

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") setVelocity((prev) => ({ ...prev, x: -moveSpeed }));
    if (e.key === "ArrowRight") setVelocity((prev) => ({ ...prev, x: moveSpeed }));
    if (e.key === "ArrowUp" && !jumping) {
      setVelocity((prev) => ({ ...prev, y: jumpStrength }));
      setJumping(true);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") setVelocity((prev) => ({ ...prev, x: 0 }));
  };

  const updatePosition = () => {
    setTruckPosition((prev) => {
      let newY = prev.y + velocity.y;
      let newX = prev.x + velocity.x;
      if (newY >= 80) {
        newY = 80;
        setJumping(false);
      }
      return { x: newX, y: newY };
    });
    setVelocity((prev) => ({ ...prev, y: prev.y + gravity }));
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const interval = setInterval(updatePosition, 50);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(interval);
    };
  }, [velocity]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Sonic the Hedgehog - Green Hill Zone</Text>
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
      </VStack>
    </Container>
  );
};

export default Index;
