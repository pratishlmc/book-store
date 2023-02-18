import React, { useState } from "react";
import {
	Box,
	Heading,
	Input,
	Text,
	AspectRatio,
	Stack,
} from "@chakra-ui/react";

import Image from "next/image";
import UploadWidget from "../UploadWidget";
export const BookImage = () => {
	const [url, updateUrl] = useState();
	const [error, updateError] = useState();

	function handleOnUpload(error, result, widget) {
		if (error) {
			updateError(error);
			widget.close({
				quiet: true,
			});
			return;
		}
		updateUrl(result?.info?.secure_url);
	}

	return (
		<>
			<Heading w="100%" textAlign={"center"} fontWeight="bold" mb="2%">
				Pick an Image
			</Heading>

			<div className={"ddd"}>
				<UploadWidget onUpload={handleOnUpload}>
					{({ open }) => {
						function handleOnClick(e: React.ChangeEvent<HTMLFormElement>) {
							e.preventDefault();
							open();
						}
						return <button onClick={handleOnClick}>Upload an Image</button>;
					}}
				</UploadWidget>

				{error?.statusText && (
					<p>
						<strong>Error:</strong> {error.statusText}
					</p>
				)}

				{url && (
					<>
						<p>
							<img src={url} alt="Uploaded image" />
						</p>
						<p>{url}</p>
					</>
				)}
			</div>

			<AspectRatio maxH={"300px"} width="full" mt={5}>
				<Box
					borderColor="gray.300"
					width={"full"}
					borderStyle="dashed"
					borderWidth="2px"
					rounded="md"
					shadow="sm"
					role="group"
					transition="all 150ms ease-in-out"
					_hover={{
						shadow: "md",
					}}
				>
					<Box position="relative" height="100%" width="100%">
						<Box
							position="absolute"
							top="0"
							left="0"
							height="100%"
							width="100%"
							display="flex"
							flexDirection="column"
						>
							<Stack
								height="100%"
								width="100%"
								display="flex"
								alignItems="center"
								justify="center"
							>
								<Box mt={10}>
									<Image
										width={150}
										height={150}
										src={"/UploadImage.svg"}
										alt={"hi"}
									/>
								</Box>
								<Stack p="8" textAlign="center" spacing="1">
									<Heading fontSize="lg" fontWeight="bold">
										Drop the book's picture
									</Heading>
									<Text fontWeight="light">or click to upload</Text>
									<Text fontSize={13} fontWeight="light">
										(Please upload your own book's picture.)
									</Text>
								</Stack>
							</Stack>
						</Box>
						<Input
							type="file"
							height="100%"
							width="100%"
							position="absolute"
							top="0"
							left="0"
							opacity="0"
							aria-hidden="true"
							accept="image/*"
						/>
					</Box>
				</Box>
			</AspectRatio>
		</>
	);
};
