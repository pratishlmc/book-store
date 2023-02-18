import React, { useState } from 'react';
import {
    Box,
    Button,
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    Text,
} from '@chakra-ui/react';
import Rating from "react-rating";
import {AiFillStar, AiOutlineQuestionCircle, AiOutlineStar} from "react-icons/all";

export const BookPricing = () => {
    const [value, setValue] = useState(0)

    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="normal">
                Pricing
            </Heading>
            <Flex flexDir={['column', 'row']} gap={2} mt={5}>
                <FormControl w={["full", "25%"]}>
                    <FormLabel fontWeight={'normal'}>
                        Currency
                    </FormLabel>
                    <Select>
                        <option hidden>currency</option>
                        <option value="npr">NPR</option>
                        <option value="inr">INR</option>
                        <option value="usd">USD</option>
                        <option value="eur">EUR</option>
                    </Select>
                </FormControl>
                <FormControl w={["full", "75%"]}>
                    <FormLabel fontWeight={'normal'}>
                        Marked Price
                    </FormLabel>
                    <Input type={"number"} id="book-name" placeholder="Original price of the book." />
                </FormControl>
            </Flex>
            <Heading mt={"4%"} fontSize={22}>Set a suitable price</Heading>
            <FormControl >
                <Flex justifyContent={"space-between"}>
                    <Box>
                        <FormLabel mt={1} fontWeight={'normal'}>
                            How is your book's condition?
                        </FormLabel>
                        <Rating
                            initialRating={value}
                            onChange={value => setValue(value)}
                            readonly={false}
                            emptySymbol={<AiOutlineStar size={30} color={"yellow"}/>}
                            fullSymbol={<AiFillStar size={30} color={"yellow"}/>}
                        />
                    </Box>
                    <Button gap={1}>Help <AiOutlineQuestionCircle/></Button>
                </Flex>
                <Flex alignItems={"center"} justifyContent={"space-between"}>
                    <Box fontSize={14}>
                        {value === 1 ?
                            <Text display={"inline"} fontWeight={"semibold"} color={"red.500"}>Poor </Text>
                            : value === 2 ?
                                <Text display={"inline"} fontWeight={"semibold"} color={"orange.500"}>Fair </Text>
                                : value === 3 ?
                                    <Text display={"inline"} fontWeight={"semibold"} color={"yellow.500"}>Good </Text>
                                    :value === 4 ?
                                        <Text display={"inline"} fontWeight={"semibold"} color={"green.800"}>Very Good </Text>
                                        :value === 5 ?
                                            <Text display={"inline"} fontWeight={"semibold"} color={"green.500"}>Like new </Text>
                                            : null
                        }
                        condition
                    </Box>
                    <Box>
                        {
                            value > 0 &&
                            <Text fontSize={14}>Recommended Price: <b>NPR {parseInt(String(530 - (530 / 100) * 25))}</b></Text>
                        }
                    </Box>
                </Flex>
            </FormControl>
            <FormControl mt={"2%"}>
                <FormLabel fontWeight={'bold'}>
                    Price
                </FormLabel>
                <Input type={"number"} defaultValue={200} placeholder="Set your Price." />
            </FormControl>
        </>
    );
};