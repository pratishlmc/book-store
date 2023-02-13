import React, {useContext, useEffect, useState} from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import {Box, Divider, Flex, Input, useColorModeValue} from "@chakra-ui/react";
import {useStateContext} from "../lib/context";

export default function Search() {
    const backgroundColor = useColorModeValue("light.200", "dark.200")
    const {searchQuery, updateQuery} = useStateContext()

    return (
            <Flex
                  h={'48px'} borderRadius={5} shadow={'sm'}
                  bgColor={backgroundColor}
                  display={'flex'}
                  alignItems={'center'} >
                <Flex alignItems={'center'} justifyContent={'center'} height={'full'} paddingX={5}>
                    <AiOutlineSearch size={20}/>
                </Flex>
                <Input
                    height={'full'}
                    width={'full'}
                    pl={0}
                    value={searchQuery}
                    onChange={(e)=> updateQuery(e.target.value)}
                    focusBorderColor={'transparent'}
                    border={'none'}
                    borderTopRightRadius={5}
                    borderBottomRightRadius={5}
                    bgColor={backgroundColor}
                    placeholder={'Search Books'}
                    type={'text'}>
                </Input>
            </Flex>
    );
}
