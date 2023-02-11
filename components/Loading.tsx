import React from 'react';
import {Box, Center, Flex} from "@chakra-ui/react";
import {Ring} from "@uiball/loaders";
export default function Loading() {
    return (
            <Center width={"full"} mt={"-50px"} height={"100vh"}>
                <Flex>
                <Ring
                    size={40}
                    lineWeight={5}
                    speed={2}
                    color="black"
                />
                </Flex>
            </Center>
    );
}
