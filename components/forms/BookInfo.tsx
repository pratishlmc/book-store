import React from 'react';
import {
    Heading,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Select,
    SimpleGrid,
    FormHelperText
} from '@chakra-ui/react';

export const BookInfo = ({formData, setFormData}) => {
    return (
        <>
            <Heading w="100%" textAlign={'center'} fontWeight="bold" mb="5%">
                Book Details
            </Heading>
            <SimpleGrid columns={[1, 2]} spacing={"10px"}>
                <FormControl mr="5%">
                    <FormLabel fontWeight={'normal'}>
                        Book's Name
                    </FormLabel>
                    <Input
                        value={formData.title}
                        onChange={(e)=> setFormData(
                            {...formData, title: e.target.value}
                        )}
                        placeholder="eg: The Alchemist" />
                </FormControl>

                <FormControl>
                    <FormLabel fontWeight={'normal'}>
                        Genre
                    </FormLabel>
                    <Select value={formData.genre}
                            onChange={(e)=> setFormData(
                                {...formData, genre: e.target.value}
                            )}>
                        <option hidden>__ select genre __</option>
                        <option value="novel">Novel</option>
                        <option value="academic">Academic</option>
                        <option value="fiction">Fictional</option>
                        <option value="non-fiction">Non-fictional</option>
                    </Select>
                </FormControl>
            </SimpleGrid>
            <Flex flexDir={['column', 'row']} gap={2} mt={"2%"}>
                <FormControl w={["full", "25%"]}>
                    <FormLabel fontWeight={'normal'}>
                        Grade
                    </FormLabel>
                    <Select value={formData.grade}
                            onChange={(e)=> setFormData(
                                {...formData, grade: e.target.value}
                            )}>
                        <option hidden>grade</option>
                        <option value="primary">Primary</option>
                        <option value="1">Grade 1</option>
                        <option value="2">Grade 2</option>
                        <option value="3">Grade 3</option>
                        <option value="4">Grade 4</option>
                        <option value="5">Grade 5</option>
                        <option value="6">Grade 6</option>
                        <option value="7">Grade 7</option>
                        <option value="8">Grade 8</option>
                        <option value="9">Grade 9</option>
                        <option value="10">Grade 10</option>
                        <option value="10">Grade 11</option>
                        <option value="10">Grade 12</option>
                        <option value="bachleor's">Bachelor's</option>
                        <option value="master's">Master's</option>
                        <option value="others">others</option>
                    </Select>
                </FormControl>
                <FormControl w={["full", "75%"]}>
                    <FormLabel textAlign={"end"} fontWeight={'normal'}>
                        Publication
                    </FormLabel>
                    <Input
                        value={formData.publication}
                        onChange={(e)=> setFormData(
                            {...formData, publication: e.target.value}
                        )}
                        placeholder="eg: The Alchemist" />
                </FormControl>
            </Flex>
            <FormControl mt="2%">
                <FormLabel htmlFor="email" fontWeight={'normal'}>
                    Author
                </FormLabel>
                <Input value={formData.author}
                       onChange={(e)=> setFormData(
                           {...formData, author: e.target.value}
                       )} placeholder={"eg: Paulo Coelho"} type="text" />
                <FormHelperText>Author or writer's name.</FormHelperText>
            </FormControl>
        </>
    );
};