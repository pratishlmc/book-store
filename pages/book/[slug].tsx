import { useQuery } from "react-query";
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
import axios from "axios";

const getBook = async () => {
	const response = await axios.get("/api/books/1");
	return response.data;
};

export default function BookDetails() {
	const route = useRouter();

	const { data, error, isLoading } = useQuery({
		queryFn: getBook,
		queryKey: ["book"],
	});

	console.log(data);
	if (error) return error;
	if (isLoading) return <Loading />;

	const { title, image, original_price, price, seller, genre }: BookTypes =
		data;
	const { name, id } = seller;

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

					<Button
						mt={4}
						width={"full"}
						variant={"brand"}
						onClick={() => route.push(`/user/${id}`)}
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
