import Head from "next/head";
import { useQuery } from "react-query";
import { Box } from "@chakra-ui/react";
import Loading from "../components/Loading";
import Gallery from "../components/Gallery";
import { useSession } from "next-auth/react";
import axios from "axios";

const allBooks = async () => {
	const response = await axios.get("/api/books");
	return response.data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery({
		queryFn: allBooks,
		queryKey: ["books"],
	});
	if (error) return error;
	if (isLoading) return <Loading/>

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
			<Gallery books={data} />
		</Box>
	);
}
