import React from 'react';
import {Box, Center, Flex, useColorModeValue} from "@chakra-ui/react";
import {Ring} from "@uiball/loaders";
export default function Loading() {
    const background = useColorModeValue("light.bg", "dark.bg")
    const spinnerColor = useColorModeValue("#111", "#fafafa")
    return (
            <Center bgColor={background} width={"full"} mt={"-100px"} height={"100vh"}>
                <Flex>
                <Ring
                    size={40}
                    lineWeight={5}
                    speed={2}
                    color={spinnerColor}
                />
                </Flex>
            </Center>
    );
}
