import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import Fuse from "fuse.js";
import Book from "./Book";
import { useStateContext } from "../lib/context";

interface Props {
	books: BookTypes[];
}
export default function Gallery({ books }: Props) {
	const { searchQuery } = useStateContext();

	const options = {
		includeScore: true,
		keys: ["title"],
	};
	const fuse = new Fuse<BookTypes>(books, options);
	const filteredBooks = fuse.search(searchQuery);

	return (
		<Box>
			<SimpleGrid marginY={[5, 8]} columns={[1, 2, 3, null, 4]} spacing="40px">
				{searchQuery === ""
					? books.map((book: BookTypes) => <Book key={book.id} book={book} />)
					: filteredBooks.map(({ item }) => {
							return <Book key={item.id} book={item} />;
					  })}
			</SimpleGrid>
			{filteredBooks.length === 0 && searchQuery !== "" && (
				<Heading mt={30} textAlign={"center"} fontSize={24}>
					Couldn't find{" "}
					<Text display={"inline"} color={"darkviolet"}>
						`{searchQuery}`
					</Text>{" "}
					on BookLinkr.
				</Heading>
			)}
		</Box>
	);
}
