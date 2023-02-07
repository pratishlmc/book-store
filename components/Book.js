import { BookStyles } from "../styles/BookStyle";
import Link from "next/link";

export default function Book({ book }) {
  //Extract from props
  const { title, price, image, slug } = book.attributes;


  return (
    <BookStyles>
      <Link href={`/book/${slug}`}>
        <div >
           <img src={image.data.attributes.url} alt={title}/>
        </div>
      </Link>
      <h2>{title} </h2>
      <h3>NPR {price}</h3>
    </BookStyles>
  );
}
