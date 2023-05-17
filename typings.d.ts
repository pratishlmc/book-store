declare module "react-color-extractor";
declare module "@prisma/client";

interface BookTypes {
	title: string;
	grade: string;
	condition: number;
	currency: string;
	publication: string;
	author: string;
	price: number;
	original_price: number;
	seller: Seller;
	image: Image;
	id: string;
	genre: string;
}

interface UserTypes {
	email?: string;
	name?: string;
	image?: string;
}

interface SellerTypes {
	id: string;
	name: string;
	email: string;
	image: string;
	links: TableData[];
	phone: string;
	country: string;
	address: string;
}
interface TableData {
	id: string;
	link: string;
	url: string;
}
