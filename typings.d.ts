declare module 'react-color-extractor';
interface AllBooks {
	books: Book[];
}

interface Book {
	data: BookData;
}

interface BookData {
	attributes: BookAttributes;
}

interface BookAttributes {
	title: string;
	grade: string,
	condition: number,
	currency: string,
	publication: string,
	author: string,
	price: number;
	original_price: number;
	seller: Seller;
	image: Image;
	slug: string;
	genre: string;
}

interface Image {
	data: ImgData;
}

interface ImgData {
	attributes: ImageAttributes;
}

interface ImageAttributes {
	url: string;
}
interface Seller {
	data: SellerData;
}

interface SellerData {
	id: string;
	attributes: SellerAttributes;
}

interface SellerAttributes {
	uid: string;
	name: string;
	email: string;
	picture: string;
	table: TableData[];
	phone: string;
	country: string;
	address: string;
}
interface TableData {
	id: string,
	platform: string,
	url: string
}