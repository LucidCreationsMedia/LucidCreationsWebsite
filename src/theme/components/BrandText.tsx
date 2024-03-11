import { Heading, Text } from "@chakra-ui/react";
import React from "react";
import { fonts } from "../AppTheme";

interface BrandTextProps {
  type: "Heading" | "Text";
  text: string;
  headerLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: string;
}

const BrandText = ({
  type,
  text,
  headerLevel,
  size
}: BrandTextProps): JSX.Element => {
  return type === "Heading" ? (
    <Heading fontFamily={fonts.brand} fontSize={size} as={headerLevel}>
      {text}
    </Heading>
  ) : (
    <Text fontFamily={fonts.brand} fontSize={size}>
      {text}
    </Text>
  );
};

export default BrandText;
