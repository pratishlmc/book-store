import React, {useContext, useState} from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import {Box, Divider, Input} from "@chakra-ui/react";
import {useStateContext} from "../lib/context";

export default function Search() {
    const {searchQuery} = useStateContext()
    const {updateQuery} = useStateContext()
    return (
            <Box h={'40px'} borderRadius={5} shadow={'sm'} bgColor={"brand.primary"} display={'flex'} alignItems={'center'} >
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'} height={'full'} width={'20%'}>
                    <AiOutlineSearch size={20}/>
                </Box>
                <Input
                    width={'80%'}
                    pl={0}
                    value={searchQuery}
                    onChange={(e)=> updateQuery(e.target.value)}
                    focusBorderColor={'transparent'}
                    borderRadius={5}
                    border={'none'}
                    bgColor={"brand.primary"}
                    placeholder={'`the alchemist`'}
                    type={'text'}>
                </Input>
            </Box>
    );
}
