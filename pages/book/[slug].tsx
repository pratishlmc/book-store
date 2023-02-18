import { GET_BOOK_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
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

export default function BookDetails() {
	const { query } = useRouter();
	const route = useRouter();
	const [results] = useQuery({
		query: GET_BOOK_QUERY,
		variables: { slug: query.slug },
	});
	const { data, fetching, error } = results;
	if (fetching) return <Loading />;
	if (error) return <p>Oh no... {error.message}</p>;

	const { title, image, original_price, price, seller, genre }: BookAttributes =
		data.books.data[0].attributes;
	const { name, uid } = seller.data.attributes;

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
				<Image
					justifySelf={"center"}
					width={"60%"}
					src={image.data.attributes.url}
					alt={title}
				/>
				<Box>
					<Heading>{title}</Heading>
					<Text mt={2}>Genre: {genre}</Text>
					<Divider mt={1} mb={1} h={1} color={"black"} />
					<Text>
						Original Price:{" "}
						<span
							style={{
								color: "red",
								textDecoration: "line-through",
							}}
						>
							NPR {original_price}
						</span>
					</Text>
					<Divider mt={1} mb={1} h={1} color={"black"} />
					<Text>
						Price: <span>NPR {price}</span>
					</Text>
					<Divider mt={1} mb={1} h={1} color={"black"} />
					<Text>
						Sold by <b>{name}</b>
					</Text>
					<Button
						mt={4}
						width={"full"}
						variant={"brand"}
						onClick={() => route.push(`/user/${uid}`)}
						justifyContent={"space-between"}
						height={"48px"}
					>
						<Text>Contact Seller</Text>
						<BsArrowRight style={{ marginLeft: 3 }} />
					</Button>
				</Box>
			</SimpleGrid>
		</>
	);
}
