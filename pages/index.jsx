import Head from "next/head";
import { BOOK_QUERY } from "../lib/query";
import { useQuery } from "urql";
import {Box, Container, Heading, SimpleGrid, Text} from "@chakra-ui/react";
import Fuse from "fuse.js";
import Book from "../components/Book";
import {useStateContext} from "../lib/context";
import { Ring } from '@uiball/loaders'

export default function Home() {
    const {searchQuery} = useStateContext()
  const [results] = useQuery({ query: BOOK_QUERY });
  const { data, fetching, error } = results;

  if(fetching)
      return (
      <Box height={'full'}
           width={'full'}
           display={'flex'}
           justifyContent={'center'}
           alignItems={'center'}>
      <Ring
          size={40}
          lineWeight={5}
          speed={2}
          color="black"
      />
  </Box>
  )

  if (error) return <p>Oh no... {error.message}</p>;

    const books = data?.books.data;
    const options = {
        includeScore: true,
        keys: ['attributes.title']
    }

    const fuse = new Fuse(books, options)
    const filteredBooks = fuse.search(searchQuery)


  return (
    <Box>
      <Head>
        <title>BookLinkr - Homepage.</title>
        <meta name="description" content="A book comes at a price, goes at a price." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <SimpleGrid mt={[2, 30]} columns={[1, 2, 3, null, 4]} spacing='40px'>
            {searchQuery === "" ? books.map((book)=>
                <Book key={book.attributes.slug} book={book} />
            )
                :
                filteredBooks.map((book)=>
                                <Book key={book.item.attributes.slug} book={book.item} />
                )
            }
        </SimpleGrid>
        {
            filteredBooks.length === 0 && searchQuery !== "" && <Heading mt={30} textAlign={'center'} fontSize={24}>
                Couldn't find <Text display={'inline'} color={"darkviolet"}>`{searchQuery}`</Text> on BookLinkr.
            </Heading>
        }
    </Box>
  );
}
