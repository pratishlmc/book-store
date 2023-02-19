import React from "react";
import {
	Box,
	Button,
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Select,
	Text,
	Modal,
	useDisclosure,
	ModalHeader,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	ModalBody,
} from "@chakra-ui/react";
import Rating from "react-rating";
import {
	AiFillStar,
	AiOutlineQuestionCircle,
	AiOutlineStar,
} from "react-icons/all";

export const BookPricing = ({ formData, setFormData }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<>
			<Heading w="100%" textAlign={"center"} fontWeight="normal">
				Pricing
			</Heading>
			<Flex flexDir={["column", "row"]} gap={2} mt={5}>
				<FormControl w={["full", "25%"]}>
					<FormLabel fontWeight={"normal"}>Currency</FormLabel>
					<Select
						value={formData.currency}
						onChange={(e) =>
							setFormData({ ...formData, currency: e.target.value })
						}
					>
						<option hidden>currency</option>
						<option value="npr">NPR</option>
						<option value="inr">INR</option>
						<option value="usd">USD</option>
						<option value="eur">EUR</option>
					</Select>
				</FormControl>
				<FormControl w={["full", "75%"]}>
					<FormLabel fontWeight={"normal"}>Marked Price</FormLabel>
					<Input
						value={formData.original_price}
						onChange={(e) =>
							setFormData({ ...formData, original_price: e.target.value })
						}
						type={"number"}
						placeholder="Original price of the book."
					/>
				</FormControl>
			</Flex>
			<Heading mt={"4%"} fontSize={22}>
				Set a suitable price
			</Heading>
			<FormControl>
				<Flex justifyContent={"space-between"}>
					<Box>
						<FormLabel mt={1} fontWeight={"normal"}>
							How is your book's condition?
						</FormLabel>
						<Rating
							initialRating={formData.condition}
							value={formData.condition}
							onChange={(value) =>
								setFormData({ ...formData, condition: value })
							}
							readonly={false}
							emptySymbol={<AiOutlineStar size={30} color={"yellow"} />}
							fullSymbol={<AiFillStar size={30} color={"yellow"} />}
						/>
					</Box>

					<Modal
						size={["full", "sm", "md", "lg"]}
						isOpen={isOpen}
						onClose={onClose}
					>
						<ModalOverlay />
						<ModalContent>
							<ModalHeader>
								<Heading fontSize={22}>
									Here are some points to consider when determining the
									condition of a book:
								</Heading>
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody paddingX={10} pb={6}>
								<ol>
									<li>
										<b>Cover:</b> Check the cover of the book for any signs of
										wear and tear, such as creases, tears, or stains.
									</li>

									<li>
										<b>Spine:</b> Look at the spine of the book and check for
										any damage, such as creases, tears, or missing pieces.
									</li>

									<li>
										<b>Pages:</b> Examine the pages of the book for any damage,
										such as tears, stains, or writing or highlighting on the
										pages.
									</li>

									<li>
										<b>Binding:</b> Check the binding of the book to ensure that
										it is intact and that the pages are not loose.
									</li>

									<li>
										<b>Odor:</b> Smell the book to check for any musty or
										unpleasant odors.
									</li>

									<li>
										<b>General wear and tear:</b> Consider the overall condition
										of the book, including any signs of general wear and tear,
										such as yellowing pages or a faded cover.
									</li>

									<li>
										<b>Previous ownership:</b> Consider whether the book has any
										marks or inscriptions from previous owners, which may affect
										its value.
									</li>
								</ol>
								<Text
									fontWeight={600}
									decoration={"underline"}
									fontSize={13}
									mt={2}
								>
									By considering these factors, you can determine the overall
									condition of the book and set an appropriate price for it on
									BookLinkr.
								</Text>
							</ModalBody>
						</ModalContent>
					</Modal>
					<Button onClick={onOpen} gap={1}>
						Help <AiOutlineQuestionCircle />
					</Button>
				</Flex>
				<Flex alignItems={"center"} justifyContent={"space-between"}>
					<Box fontSize={14}>
						{formData.condition === 1 ? (
							<Text
								display={"inline"}
								fontWeight={"semibold"}
								color={"red.500"}
							>
								Poor{" "}
							</Text>
						) : formData.condition === 2 ? (
							<Text
								display={"inline"}
								fontWeight={"semibold"}
								color={"orange.500"}
							>
								Fair{" "}
							</Text>
						) : formData.condition === 3 ? (
							<Text
								display={"inline"}
								fontWeight={"semibold"}
								color={"yellow.500"}
							>
								Good{" "}
							</Text>
						) : formData.condition === 4 ? (
							<Text
								display={"inline"}
								fontWeight={"semibold"}
								color={"green.800"}
							>
								Very Good{" "}
							</Text>
						) : formData.condition === 5 ? (
							<Text
								display={"inline"}
								fontWeight={"semibold"}
								color={"green.500"}
							>
								Like new{" "}
							</Text>
						) : null}
						{formData.condition > 0 && (
							<Text display={"inline"}>condition</Text>
						)}
					</Box>
					<Box>
						{formData.original_price > 0 && formData.condition > 0 && (
							<Text fontSize={14}>
								Recommended Price:{" "}
								<b>
									NPR{" "}
									{parseInt(
										String(
											formData.original_price -
												(formData.original_price / 100) *
													(formData.condition === 5
														? 25
														: formData.condition === 4
														? 35
														: formData.condition === 3
														? 45
														: formData.condition === 2
														? 55
														: formData.condition === 1
														? 65
														: null)
										)
									)}
								</b>
							</Text>
						)}
					</Box>
				</Flex>
			</FormControl>
			<FormControl mt={"2%"}>
				<FormLabel fontWeight={"bold"}>Price</FormLabel>
				<Input
					value={formData.price}
					onChange={(e) => setFormData({ ...formData, price: e.target.value })}
					type={"number"}
					defaultValue={200}
					placeholder="Set your Price."
				/>
			</FormControl>
		</>
	);
};
