import React, { useState } from "react";
import { Progress, Box, ButtonGroup, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { BookInfo } from "../components/forms/BookInfo";
import { BookImage } from "../components/forms/BookImage";
import { BookPricing } from "../components/forms/BookPricing";
import Loading from "../components/Loading";

// interface FormType {
// 	title: string;
// 	genre: string;
// 	grade: string;
// 	publication: string;
// 	image: string;
// 	author: string;
// 	currency: string;
// 	original_price: number;
// 	condition: number;
// 	price: number;
// }

const SellBooks = () => {
	const [step, setStep] = useState(1);
	const [progress, setProgress] = useState(33.33);
	const [formData, setFormData] = useState({
		title: "",
		genre: "",
		grade: "",
		publication: "",
		image: "",
		author: "",
		currency: "",
		original_price: 0,
		condition: 0,
		price: 0,
	});
	return (
		<>
			{/* <Loading/> */}
			<Box maxWidth={800} p={6} m="30px auto" as="form">
				<Progress
					borderRadius={30}
					size={"sm"}
					value={progress}
					colorScheme={"gray"}
					mt={2}
					mb="5%"
					mx="5%"
				></Progress>

				<Button onClick={() => console.log(formData)}>Click me</Button>

				{step === 1 ? (
					<BookInfo formData={formData} setFormData={setFormData} />
				) : step === 2 ? (
					<BookImage formData={formData} setFormData={setFormData} />
				) : (
					<BookPricing formData={formData} setFormData={setFormData} />
				)}
				<ButtonGroup mt="5%" w="100%">
					<Flex w="100%" justifyContent="space-between">
						<Flex gap={2}>
							{step === 1 ? (
								<Link href={"/"}>
									<Button
										fontWeight={"normal"}
										colorScheme="red"
										variant="solid"
										w="7rem"
										mr="5%"
									>
										Cancel
									</Button>
								</Link>
							) : (
								<Button
									onClick={() => {
										setStep(step - 1);
										setProgress(progress - 33.33);
									}}
									fontWeight={"normal"}
									isDisabled={step === 1}
									colorScheme="gray"
									variant="solid"
									w="7rem"
									mr="5%"
								>
									Back
								</Button>
							)}
							<Button
								w="7rem"
								hidden={step === 3}
								onClick={() => {
									setStep(step + 1);
									if (step === 3) {
										setProgress(100);
									} else {
										setProgress(progress + 33.33);
									}
								}}
								variant={"brand"}
							>
								Next
							</Button>
						</Flex>
						{step === 3 ? (
							<Button
								w="7rem"
								variant="brand"
								onClick={() => console.log(formData)}
							>
								Submit
							</Button>
						) : null}
					</Flex>
				</ButtonGroup>
			</Box>
		</>
	);
};

export default SellBooks;
