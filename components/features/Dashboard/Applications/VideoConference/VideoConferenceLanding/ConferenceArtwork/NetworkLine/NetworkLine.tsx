import React from 'react'
import { motion } from "framer-motion"

interface NetworkLineProps {
    bits: number;
    bitTravelTime: number;
    bitMargin: number;
    style?: React.CSSProperties;
  }

const NetworkLine: React.FC<NetworkLineProps> = ({
    bits,
    bitTravelTime,
    bitMargin,
    style,
  }) => {
    const bitLength = 20;
    const width = bits * (bitLength + bitMargin);
    return (
      <motion.div
        style={{
          width: width,
          height: 4,
          position: "absolute",
          overflow: "hidden",
          ...style,
        }}
      >
        {Array.from({ length: bits }, (_, i) => {
          const bitStyle: React.CSSProperties = {
            height: "100%",
            background: "grey",
            width: bitLength,
            position: "absolute",
            borderRadius: 5,
          };
          const transition = {
            duration: bitTravelTime,
            delay: (bitTravelTime / width) * (bitLength + bitMargin) * i,
            repeat: Infinity,
            ease: "linear",
          };
          return (
            <motion.div
              key={i}
              style={bitStyle}
              initial={{ left: -bitLength }}
              animate={{ left: "100%" }}
              transition={transition}
            />
          );
        })}
      </motion.div>
    );
  };

export default NetworkLine