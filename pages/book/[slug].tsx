import Head from "next/head";
import {
	SimpleGrid,
	Heading,
	Image,
	Text,
	Box,
	Button,
	Divider,
	Flex,
} from "@chakra-ui/react";
import Loading from "../../components/Loading";
import { BsArrowRight } from "react-icons/bs";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BookDetails() {
	const [book, setBook] = useState<BookTypes>();
	const route = useRouter();

	const { slug } = route.query;
	axios.get(`/api/books/${slug}`).then((response) => {
		setBook(response.data);
	});

	if (!book) {
		return <Loading />;
	}

	if (book) {
		const { title, image, original_price, price, genre }: BookTypes = book;
		const { name, id } = book.seller;
		return (
			<>
				<Head>
					<title>
						{title} - {name}.
					</title>
				</Head>

				<SimpleGrid
					mb={30}
					mt={30}
					h={"fit-content"}
					columns={[1, 1, 2, 2]}
					spacing="50px"
				>
					<Image justifySelf={"center"} width={"60%"} src={image} alt={title} />
					<Box>
						<Heading>{title}</Heading>
						<Flex justify={"space-between"} mt={2}>
							<Text>Genre</Text>
							<Text>{genre}</Text>
						</Flex>
						<Divider mt={1} mb={1} h={1} color={"black"} />
						<Flex justify={"space-between"} mt={2}>
							<Text>Original Price </Text>
							<span
								style={{
									color: "red",
									textDecoration: "line-through",
								}}
							>
								NPR {original_price}
							</span>
						</Flex>

						<Divider mt={1} mb={1} h={1} color={"black"} />
						<Flex justify={"space-between"} mt={2}>
							<Text>Price</Text>
							<Text>
								<span>NPR </span>
								<strong>{price}</strong>
							</Text>
						</Flex>

						<Divider mt={1} mb={1} h={1} color={"black"} />
						<Flex justify={"space-between"} mt={2}>
							<Text>Sold by</Text>
							<Text>
								<b>{name}</b>
							</Text>
						</Flex>
						<Link href={`/profile/${id}`}>
							<Box>
								<Button
									mt={4}
									width={"full"}
									variant={"brand"}
									// onClick={() => route.push(`/profile/${id}`)}
									justifyContent={"space-between"}
									height={"48px"}
								>
									<Text>Contact Seller</Text>
									<BsArrowRight style={{ marginLeft: 3 }} />
								</Button>
							</Box>
						</Link>
					</Box>
				</SimpleGrid>
			</>
		);
	}
}
