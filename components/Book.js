import Link from "next/link";
import {Box, Card, color, Divider, Heading, Image, Skeleton, Text} from "@chakra-ui/react";

export default function Book({ book, primary }) {
    console.log(primary)
    //Extract from props
    const { title, price, image, slug, genre } = book.attributes;
    return (
            <Link href={`/book/${slug}`}>
                <Card boxShadow={'sm'}
                      h={'fit-content'}
                      bgColor={"brand.primary"}
                      borderRadius={5}
                      padding={4}>
                    <Image borderRadius={2.5} src={image.data.attributes.url || "/house-blue.webp"} alt={title}/>

                    <Box mt={2}>
                        <Text noOfLines={[1, 2, 2, 1]}
                              fontSize={18}>
                            <b>{title}</b>
                        </Text>
                        <Text>{genre}</Text>
                        <Text fontSize={14}>NPR
                            <Text ml={1} display={'inline'} color={'green.600'}>
                                {price}
                            </Text>
                        </Text>
                    </Box>
                </Card>
            </Link>
);
}
