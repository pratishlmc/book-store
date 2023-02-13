import Link from "next/link";
import User from "./User";
import {Badge, Box, Button, Flex, Heading, useColorMode, useColorModeValue} from "@chakra-ui/react";
import Search from "./Search";
import {useRouter} from "next/router";
import {FiMoon, FiSun} from "react-icons/fi";
export default function Nav() {

    const route = useRouter()
    const { colorMode, toggleColorMode } = useColorMode()
    const background = useColorModeValue("255, 255, 255", "13, 17, 23")

    return (
        <Flex zIndex={'99'} bg={'white'} as={"header"} top={0} position={"sticky"}
              backgroundColor={`rgba(${background}, 0.9)`}
              backdropFilter={"saturate(180%) blur(5px)"}
              w={'100%'}
              paddingX={[5, 12, 16, 20, 24]}
              flexDir={'column'}
              gap={3} pt={5} pb={5}>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Link href="/">
                  <Flex>
                      <Heading fontSize={20}>
                          BookLinkr.
                      </Heading>
                      <Badge ml={1} h={'fit-content'} colorScheme={"blue"}>BETA</Badge>
                  </Flex>
              </Link>
                <Flex alignItems={'center'} gap={5}>
                    <Button onClick={toggleColorMode}>
                        {colorMode === 'light' ? <FiMoon/> : <FiSun/>}
                    </Button>
                    <User />
                </Flex>
            </Flex>
            {route.pathname === "/" && <Search />}
        </Flex>
  );
}