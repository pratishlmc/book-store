import React, { useState } from "react";
import { Heading, Flex, Button, Text } from "@chakra-ui/react";

import Image from "next/image";
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import { AiOutlineClose } from "react-icons/ai";

export const BookImage = ({ formData, setFormData }) => {
	const [error, updateError] = useState();
	const [loading, setLoading] = useState<boolean>(false);

	const uploader = Uploader({
		// apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
		// 	? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
		// 	: "free",
		apiKey: "free",
	});
	const options = {
		maxFileCount: 1,
		mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
		editor: { images: { crop: false } },
		styles: { colors: { primary: "#000" } },
	};

	const UploadDropZone = () => (
		<UploadDropzone
			uploader={uploader}
			options={options}
			onUpdate={(file) => {
				if (file.length !== 0) {
					setFormData({
						...formData,
						image: file[0].fileUrl.replace("raw", "thumbnail"),
					});
				}
			}}
			width="670px"
			height="250px"
		/>
	);

	return (
		<>
			<Heading w="100%" textAlign={"center"} fontWeight="bold" mb="2%">
				Pick an Image
			</Heading>
			<Flex flexDir={"column"} alignItems="center" justifyContent="center">
				{formData.image ? (
					<>
						<Image
							alt="Book's thumbnail"
							src={formData.image}
							width={200}
							height={200}
							style={{ objectFit: "contain", borderRadius: 5 }}
						/>
						<Flex mt={4} alignItems={"center"}>
							<Text fontSize={14}>
								<b>Replace Image?</b> |{" "}
							</Text>
							<Button
								onClick={() => setFormData({ ...formData, image: "" })}
								size={"sm"}
								variant="outline"
								ml={2}
								fontWeight={"normal"}
								colorScheme={"red"}
							>
								Remove
							</Button>
						</Flex>
					</>
				) : (
					UploadDropZone()
				)}
			</Flex>
		</>
	);
};
