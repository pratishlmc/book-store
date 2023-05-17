import prisma from "../../../prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	if (req.method === "GET") {
		try {
			const data = await prisma.user.findUnique({
				where: {
					id: id,
				},
			});
			return res.status(200).json(data);
		} catch (err) {
			console.log(err);
		}
	}
}
