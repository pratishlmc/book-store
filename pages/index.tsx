import Head from "next/head";
import { BOOK_QUERY } from "../lib/query";
import { useQuery } from "urql";
import { Box, Button } from "@chakra-ui/react";
import Loading from "../components/Loading";
import Gallery from "../components/Gallery";
import { useSession } from "next-auth/react";

export default function Home() {
	// const [results] = useQuery({ queryFn:  });
	// const { data, fetching, error } = results;

	// if (fetching) return <Loading />;

	// if (error) return <p>Oh no... {error.message}</p>;

	const handleFetch = async () => {
		await fetch("http://localhost:3000/api/books")
			.then((res) => res.json())
			.then((data) => console.log(data));
	};

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

			<Button onClick={() => handleFetch()}>click</Button>

			{/* <Gallery books={data?.books.data} /> */}
		</Box>
	);
}
