/*eslint-disable*/
import React from "react";
import { Flex, Text, useColorModeValue } from "@chakra-ui/react";

export default function Footer() {
  let textColor = useColorModeValue("blue.500", "white");

  return (
    <Flex
      zIndex="3"
      flexDirection={{
        base: "column",
        lg: "row",
      }}
      alignItems={{
        base: "center",
        xl: "start",
      }}
      justifyContent="space-between"
    >
      <Text
        color={textColor}
        textAlign={{
          base: "center",
          xl: "start",
        }}
      >
        {" "}
        &copy; {1900 + new Date().getYear()}
        <Text as="span" fontWeight="500" ms="4px">
          {" "}
          All Rights Reserved.
        </Text>
      </Text>
    </Flex>
  );
}
