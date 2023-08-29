import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo1 from "../Images/Home/logo1.png";
import { NavLink, Link } from "react-router-dom";

const links = [
  { path: "/", title: "Home" },
  { path: "/recipes", title: "Recipes" },
  { path: "/about", title: "About" },
  { path: "/contact", title: "Contact" },
  
];

const links2 = [
  { path: "/", title: "Home" },
  { path: "/recipes", title: "Recipes" },
  { path: "/register", title: "Signup / Register" },
  // { path: "/admin", title: "" },
  // { path: "/profile", title: "Profile" },
  { path: "/myrecipes", title: "Saved Recipes"}
]

// const NavLink = ({ children }) => (
//   <Link
//     px={2}
//     py={1}
//     fontSize={"20"}
//     rounded={"md"}
//     _hover={{
//       color: useColorModeValue("white", "white"),
//       borderBottom: "4px solid gray",
//       fontsize: "22px",
//     }}
//     borderBottom={"1px solid #ffca6f;"}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );

const defaultLinkStyle = {
  textDecoration: "none",
  color: "#ffca6f",
  fontSize: "20px",
  letterSpacing: "1px"
};
const activeLinkStyle = {
  width: "80px",
  textDecoration: "none",
  color: "white",
  borderBottom: "4px solid gray",
  borderRadius: "10px",
  paddingBottom: "3px",
  fontSize: "20px",
  fontWeight: "bold",
  letterSpacing: "1px",
  margin: "auto"
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      style={{
        zIndex: 10,
        position: "sticky",
        width: "100%",
        top: "0px",
        borderBottom: "1px solid #ffca6f",
        paddingTop :"10px",
        paddingBottom:"10px",
        background:"#171819"
      }}
    >
      <Box bg={useColorModeValue("transparent")} background={"#171819"} color={"#ffca6f"} px={4}>
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={10} padding={"20px opx 20px"}  alignItems={"center"}>
            <Box w={"125px"}  ml={10}>
              <img  src={logo1} alt="" />
            </Box>
            <HStack
              as={"nav"}
              spacing={12}
              display={{ base: "none", md: "flex" }}
            >
              {links.map(({path, title}) => (
                <NavLink style={({ isActive }) => {
                  return isActive ? activeLinkStyle : defaultLinkStyle;
                }} key={path} to={path}>
                  {title}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} mr={3}>
            <Menu>
              <MenuButton
                as={Button}
                border={"3px solid white"}
                p={1}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                _hover={{
                  border: "3px solid #ffca6f",
                }}
                minW={0}
              >
                <div>
                  <Avatar
                    size={"md"}
                    src={
                      "https://e0.pxfuel.com/wallpapers/266/672/desktop-wallpaper-tom-cruise-background-black-closeup-face-men-face.jpg"
                    }
                  />
                </div>
              </MenuButton>
              <MenuList bg={"blackAlpha.800"}>
              {/* <Link to={"/"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"90px"} color={"white"}>Home</MenuItem></Link> */}
              {/* <MenuDivider />
              <Link to={"/recipes"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"90px"} color={"white"}>All Recipes</MenuItem></Link> */}
              {/* <MenuDivider /> */}
                <Link to={"/login"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"90px"} color={"white"}>Login</MenuItem></Link>
                <MenuDivider />
                <Link to={"/profile"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"88px"} color={"white"}>Profile</MenuItem></Link>
                <MenuDivider />
                <Link to={"/myrecipes"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"68px"} color={"white"}>Saved Recipes</MenuItem></Link>
                <MenuDivider />
                <Link to={"/admin"}><MenuItem bg={"gray.700"} fontSize={"1rem"} pl={"68px"} color={"white"}>Admin Login</MenuItem></Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }} paddingTop={"20px"} marginTop={"20px"} borderTop={"1px solid #ffca6fc3"}>
            <Stack as={"nav"} spacing={4}>
              {links2.map(({path, title}) => (
                <NavLink key={path} to={path}>{title}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};

export default Navbar;
