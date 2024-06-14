// Chakra Imports
import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AdminNavbarLinks from "components/navbar/NavbarLinksAdmin";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import crmLogo from "../../assets/img/layout/crm-icon.png";

export default function AdminNavbar(props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", changeNavbar);
    return () => {
      window.removeEventListener("scroll", changeNavbar);
    };
  });

  const {
    secondary,
    message,
    brandText,
    setOpenSidebar,
    openSidebar,
    largeLogo,
    routes,
  } = props;
  // Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
  let mainText = useColorModeValue("navy.700", "white");
  let navbarPosition = "fixed";
  let navbarFilter = "none";
  let navbarBackdrop = "blur(20px)";
  let navbarShadow = "none";
  let navbarBg = useColorModeValue("#fff", "rgba(11,20,55,0.5)");
  let navbarBorder = "transparent";
  let secondaryMargin = "-9px";
  let paddingX = "15px";
  let gap = "0px";
  const changeNavbar = () => {
    if (window.scrollY > 1) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  return (
    <Box
      position={navbarPosition}
      boxShadow={navbarShadow}
      bg={navbarBg}
      borderColor={navbarBorder}
      filter={navbarFilter}
      backdropFilter={navbarBackdrop}
      backgroundPosition="center"
      backgroundSize="cover"
      borderWidth="1.5px"
      borderStyle="solid"
      zIndex={1}
      transitionDelay="0s, 0s, 0s, 0s"
      transitionDuration=" 0.25s, 0.25s, 0.25s, 0s"
      transition-property="box-shadow, background-color, filter, border"
      transitionTimingFunction="linear, linear, linear, linear"
      alignItems={{ xl: "center" }}
      display={secondary ? "block" : "flex"}
      minH="75px"
      justifyContent={{ xl: "center" }}
      lineHeight="25.6px"
      mx="auto"
      mt={secondaryMargin}
      pb="6px"
      right={{ base: "0px" }}
      px={{
        sm: paddingX,
        md: "10px",
      }}
      ps={{
        xl: "12px",
      }}
      pt="8px"
      top={{ base: "0px" }}
      w={{
        base: "100vw",
      }}
      sx={{ boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)" }}
    >
      <Flex
        w="100%"
        flexDirection={{
          sm: "column",
          md: "row",
        }}
        alignItems={{ xl: "center" }}
        mb={gap}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Flex
            me={openSidebar ? "" : "5"}
            mx={openSidebar ? "14" : "1"}
            display={{ sm: "none", xl: "flex" }}
          >
            {(largeLogo && largeLogo[0]?.logoLgImg) ||
            (largeLogo && largeLogo[0]?.logoSmImg) ? (
              <Image
                style={{
                  width: openSidebar ? "165px" : "60px",
                  height: "52px",
                  objectFit: "contain",
                }}
                src={
                  openSidebar === true
                    ? largeLogo[0]?.logoLgImg
                    : largeLogo[0]?.logoSmImg
                } // Set the source path of your image
                alt="Logo" // Set the alt text for accessibility
                cursor="pointer"
                onClick={() => !props.from && setOpenSidebar(!openSidebar)}
                userSelect="none"
                my={2}
              />
            ) : crmLogo ? (
              <Image
                style={{
                  width: openSidebar ? "165px" : "60px",
                  height: "52px",
                  objectFit: "contain",
                }}
                // src={openSidebar === true ? crmLogo : crmLogo} // Set the source path of your image
                src={crmLogo}
                alt="Logo" // Set the alt text for accessibility
                cursor="pointer"
                onClick={() => !props.from && setOpenSidebar(!openSidebar)}
                userSelect="none"
                my={2}
              />
            ) : (
              <Heading
                my={4}
                style={{
                  width: openSidebar ? "165px" : "60px",
                  height: "52px",
                  objectFit: "contain",
                }}
                cursor={"pointer"}
                onClick={() => !props.from && setOpenSidebar(!openSidebar)}
                userSelect={"none"}
              >
                {openSidebar === true ? "CRM" : "CR"}
              </Heading>
            )}
          </Flex>
          <Box
            display={{ sm: "none", xl: "flex" }}
            ms={openSidebar ? "" : "3"}
            onClick={() => setOpenSidebar(!openSidebar)}
            style={{ fontSize: "25px" }}
          >
            {openSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
          </Box>
          <Link color={mainText} display={{ sm: "flex", xl: "none" }}>
            {largeLogo && largeLogo[0]?.logoLgImg ? (
              <Image
                style={{ width: "100%", height: "52px" }}
                src={largeLogo[0]?.logoLgImg}
                alt="Logo"
                cursor="pointer"
                userSelect="none"
                my={2}
              />
            ) : (
              <Heading my={4} cursor={"pointer"} userSelect={"none"}>
                {openSidebar === true ? "CRM" : "CR"}
              </Heading>
            )}
          </Link>

          <Link
            color={mainText}
            href="#"
            pt="2px"
            bg="inherit"
            ps="30px"
            display={{ sm: "none", xl: "flex" }}
            borderRadius="inherit"
            fontWeight="bold"
            fontSize="34px"
            textTransform={"capitalize"}
            _hover={{ color: { mainText } }}
            _active={{
              bg: "inherit",
              transform: "none",
              borderColor: "transparent",
            }}
            _focus={{
              boxShadow: "none",
            }}
          >
            {brandText}
          </Link>
        </Box>
        <Box ms="auto" w={{ sm: "100%", md: "unset" }}>
          <AdminNavbarLinks
            setOpenSidebar={setOpenSidebar}
            openSidebar={openSidebar}
            onOpen={props.onOpen}
            logoText={props.logoText}
            secondary={props.secondary}
            fixed={props.fixed}
            scrolled={scrolled}
            routes={routes}
          />
        </Box>
      </Flex>
      {secondary ? <Text color="white">{message}</Text> : null}
    </Box>
  );
}

AdminNavbar.propTypes = {
  brandText: PropTypes.string,
  variant: PropTypes.string,
  secondary: PropTypes.bool,
  fixed: PropTypes.bool,
  onOpen: PropTypes.func,
};
