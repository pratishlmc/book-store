import Link from "next/link";
import User from "./User";
import {AiOutlineSearch} from "react-icons/ai";
import {Badge, Box, Button, Flex, Heading, useColorMode} from "@chakra-ui/react";
import Search from "./Search";
import {useRouter} from "next/router";
import {FiMoon, FiSun} from "react-icons/fi";

export default function Nav() {
    const route = useRouter()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
    <Flex alignItems={'center'} justifyContent={'space-between'} pt={5} pb={5}>
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
  );
}
