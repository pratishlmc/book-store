import Head from "next/head";
import { BOOK_QUERY } from "../lib/query";
import { useQuery } from "urql";
import Book from "../components/Book";
import { Gallery } from "../styles/Gallery";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Home() {
  //Fetch books from strapi
  const [results] = useQuery({ query: BOOK_QUERY });
  const { data, fetching, error } = results;

  //Checks for the data coming in
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  const books = data.books.data;

  return (
    <div>
      <Head>
        <title>Paana - Homepage.</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={'home-gallery'}>
        <Gallery>
          {fetching && <Skeleton />}
          {books.map((book) => (
            <Book key={book.attributes.slug} book={book} />
          ))}
        </Gallery>
      </main>
    </div>
  );
}