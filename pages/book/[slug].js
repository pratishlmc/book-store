import {
  DetailsStyle,
  BookInfo,
  ContactBtn,
} from "../../styles/BookDetails";
import { GET_BOOK_QUERY } from "../../lib/query";
import { useQuery } from "urql";
import { useRouter } from "next/router";
import Head from "next/head";

export default function BookDetails() {

  //Fetch slug
  const { query } = useRouter();
  const route = useRouter();
  //Fetch Graphql data
  const [results] = useQuery({
    query: GET_BOOK_QUERY,
    variables: { slug: query.slug },
  });
  const { data, fetching, error } = results;
  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  //Extract Data
  const { title, image, original_price, price, seller, genre } = data.books.data[0].attributes;
  const {name, uid } = seller.data.attributes

  return (
      <>
        <Head>
          <title>{title} - {name}.</title>
        </Head>
        <DetailsStyle>
          <img src={image.data.attributes.url} alt={title}/>
          <BookInfo>
            <h2>{title}</h2>
            <p>Genre: {genre}</p>
            <p>Original Price: <span style={{
              color: 'red',
              textDecoration: "line-through"
            }}>NPR {original_price}</span>
            </p>
            <p>Price: <span style={{
              color: 'black',
            }}>NPR {price}</span></p>
            <p>by <b>{name}</b></p>
            <ContactBtn
                onClick={() => route.push(`/user/${uid}`)}
            >
              Contact Seller
            </ContactBtn>
          </BookInfo>
        </DetailsStyle>
      </>
  );
}
