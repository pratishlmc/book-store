import { useRouter } from "next/router";
import Links from "../../components/Links";
import React, { useState } from "react";
import CreateSeller from "../../components/CreateSeller";
import Image from "next/image";
import Head from "next/head";
import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import { ColorExtractor } from "react-color-extractor";
import Loading from "../../components/Loading";
import axios from "axios";
import { useSession } from "next-auth/react";

export default function Profile() {
	const [cover, setCover] = useState<string[]>([]);
	const [userProfile, setUserProfile] = useState();
	const route = useRouter();
	const { session } = useSession();

	const { id } = route.query;
	axios.get(`/api/user/${id}`).then((response) => {
		setUserProfile(response.data);
	});

	const activeProfile: SellerTypes = userProfile;

	if (!activeProfile) {
		return (
			<Box display={"center"} justifyContent={"center"} mt={30}>
				<Heading>Sorry, The seller does not exist.</Heading>
			</Box>
		);
	}

	return (
		<>
			<Head>
				<title>Profile - {activeProfile.name}</title>
			</Head>
			{!cover && !activeProfile && <Loading />}
			<Box>
				<ColorExtractor
					src={activeProfile.image}
					getColors={(colors: string[]) => setCover([colors[0], colors[1]])}
				/>
				<Box h={"200px"}>
					<Box
						shadow={"lg"}
						borderRadius={10}
						w={"full"}
						h={"75%"}
						style={{
							backgroundImage: `linear-gradient(90deg, ${cover?.[0]}, ${cover?.[1]})`,
						}}
					></Box>
					<Box
						mt={-65}
						shadow={"lg"}
						borderRadius={"full"}
						h={"fit-content"}
						w={"fit-content"}
						ml={5}
					>
						<Image
							width={100}
							height={100}
							style={{
								borderRadius: "50%",
							}}
							src={activeProfile.image}
							alt={activeProfile.name}
						/>
					</Box>
				</Box>

				<Text fontWeight={600} mt={2} fontSize={22}>
					{activeProfile.name}
				</Text>
				<Text fontSize={14}>{activeProfile.email}</Text>

				<Text color={"gray.500"} fontSize={14}>
					{activeProfile.address}, {activeProfile.country}
				</Text>
				<Text color={"gray.500"} fontSize={12}>
					{activeProfile.phone}
				</Text>
			</Box>
			<Divider mt={2} mb={2} h={2} color={"black"} />
			{
				// <Links
				// 	isUser={activeProfile.email === session?.user?.email}
				// 	data={activeProfile.links}
				// />
			}
		</>
	);
}
