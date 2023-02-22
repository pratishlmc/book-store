import Link from "next/link";
import { Box, Card, Image, Text, useColorModeValue } from "@chakra-ui/react";

type Props = {
	book: BookTypes;
};

export default function Book({ book }: Props) {
	const backgroundColor = useColorModeValue("light.200", "dark.200");
	const { title, price, image, id, genre, original_price } = book;

	return (
		<Link href={`/book/${id}`}>
			<Card
				boxShadow={"sm"}
				h={"fit-content"}
				bgColor={backgroundColor}
				borderRadius={5}
				padding={4}
			>
				<Image
					borderRadius={2.5}
					src={image}
					alt={title}
				/>

				<Box mt={2}>
					<Text noOfLines={[1, 2, 2, 1]} fontSize={18}>
						<b>{title}</b>
					</Text>
					<Text>{genre}</Text>
					<Text fontSize={14}>
						NPR
						<Text ml={1} textDecoration={"line-through"} display={"inline"} color={"red.400"}>
							{original_price}
						</Text>
						<Text ml={1} display={"inline"} color={"green.400"}>
							{price}
						</Text>
					</Text>
				</Box>
			</Card>
		</Link>
	);
}
