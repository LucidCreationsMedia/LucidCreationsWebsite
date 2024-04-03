import React from "react";
import { Box, Link, Button, BoxProps, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

const MotionBox = motion<BoxProps>(Box);

const GitHub = (): JSX.Element => {
  return (
    <MotionBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <Link
        href="work/lcm/LucidCreationsWebsite/src/components/buttons/KoFi.tsx"
        target="_blank"
        rel="noopener"
      >
        <Button variant="primary" leftIcon={<Icon icon="mdi:github" />}>
          <Text>{"View Codebase"}</Text>
        </Button>
      </Link>
    </MotionBox>
  );
};

export default GitHub;
