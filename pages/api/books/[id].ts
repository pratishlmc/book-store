import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	if (req.method === "GET") {
		try {
			const data = await prisma.book.findUnique({
				where: {
					id: id,
				},
				include: {
					seller: true,
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			res.status(403).json({ err: "Error has occured while getting books." });
		}
	}
}
