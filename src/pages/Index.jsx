import { Box, Image } from "@chakra-ui/react";
import truckImage from "../assets/truck.png";
import tornadoImage from "../assets/tornado.png";
import { useEffect, useState } from "react";

const Index = () => {
  const [truckPosition, setTruckPosition] = useState({ x: 50, y: 50 });
  const [tornadoes, setTornadoes] = useState([
    { x: 100, y: 100 },
    { x: 200, y: 150 },
  ]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setTruckPosition((prev) => {
        let newX = prev.x;
        let newY = prev.y;
        if (e.key === "ArrowUp") newY -= 10;
        if (e.key === "ArrowDown") newY += 10;
        if (e.key === "ArrowLeft") newX -= 10;
        if (e.key === "ArrowRight") newX += 10;
        return { x: newX, y: newY };
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Box position="relative" width="100vw" height="100vh" bg="green.500">
      <Image src={truckImage} position="absolute" left={`${truckPosition.x}px`} top={`${truckPosition.y}px`} width="50px" height="50px" />
      {tornadoes.map((tornado, index) => (
        <Image key={index} src={tornadoImage} position="absolute" left={`${tornado.x}px`} top={`${tornado.y}px`} width="50px" height="50px" />
      ))}
    </Box>
  );
};

export default Index;
