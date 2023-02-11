import Link from "next/link";
import User from "./User";
import {AiOutlineSearch} from "react-icons/ai";
import {Box, Button, Heading, useColorMode} from "@chakra-ui/react";
import Search from "./Search";
import {useRouter} from "next/router";

export default function Nav() {
    const route = useRouter()
    const { colorMode, toggleColorMode } = useColorMode()

    return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} pt={5} pb={5}>
      <Link href="/">
          <Heading fontSize={20}>
              BookLinkr.
          </Heading>
      </Link>
        <Box display={'flex'} alignItems={'center'} gap={5}>
            <Button onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Button>
            {
                route.pathname === "/" &&
                    <Search/>
            }
            <User />
        </Box>

    </Box>
  );
}
