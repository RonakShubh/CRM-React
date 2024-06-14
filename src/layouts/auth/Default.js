// Chakra imports
import { Box, Flex } from "@chakra-ui/react";
import Footer from "components/footer/FooterAuth";
import illustrationBackground from "../../assets/img/auth/PNG-02.png";
// Custom components
// Assets

function AuthIllustration(props) {
  const { children } = props;
  // Chakra color mode
  // #787DDF
  // #010B21
  // #824CF1
  // black
  return (
    <Flex h="max-content" bg={"#010B21"}>
      <Flex
        h={{
          sm: "initial",
          md: "unset",
          lg: "100vh",
          xl: "97vh",
        }}
        w="100%"
        maxW={{ md: "66%", lg: "1313px" }}
        mx="auto"
        pt={{ sm: "50px", md: "0px" }}
        px={{ lg: "30px", xl: "0px" }}
        ps={{ xl: "70px" }}
        justifyContent="center"
        direction="column"
      >
        {children}
        <Box
          display={{ base: "none", md: "flex" }}
          h="100%"
          maxH="97vh"
          w={{ lg: "50vw", "2xl": "44vw" }}
          borderBottomLeftRadius={{ lg: "120px", xl: "200px" }}
          justifyContent="center"
          position="absolute"
          flexDirection={"column"}
          alignItems={"center"}
          bg={"#824CF1"}
          overflow={"hidden"}
          right="0px"
        >
          <Flex
            bg={`url(${illustrationBackground})`}
            justify="center"
            align="center"
            w="100%"
            h="100%"
            bgSize="cover"
            bgPosition="50%"
          />
        </Box>
        <Footer />
      </Flex>
    </Flex>
  );
}

export default AuthIllustration;
