import Head from "next/head";
import { BOOK_QUERY } from "../lib/query";
import { useQuery } from "urql";
import { Box } from "@chakra-ui/react";
import Loading from "../components/Loading";
import Gallery from "../components/Gallery";

export default function Home() {
	const [results] = useQuery({ query: BOOK_QUERY });
	const { data, fetching, error } = results;

	if (fetching) return <Loading />;

	if (error) return <p>Oh no... {error.message}</p>;

	return (
		<Box>
			<Head>
				<title>BookLinkr - Homepage.</title>
				<meta
					name="description"
					content="A book comes at a price, goes at a price."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Gallery books={data?.books.data} />
		</Box>
	);
}
