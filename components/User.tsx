import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import {
	Box,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useColorModeValue,
	useRadioGroup,
} from "@chakra-ui/react";
import Image from "next/image";
import {
	AiOutlineBook,
	AiOutlineCaretDown,
	AiOutlineLogout,
	AiOutlineUser,
} from "react-icons/ai";
import Link from "next/link";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function User() {
	const route = useRouter();
	const { status, data: session } = useSession();
	const user = session?.user;
	const backgroundColor = useColorModeValue("light.200", "dark.200");

	if (status === "loading") {
		return null;
	}

	if (status === "authenticated") {
		return (
			<Box h={"40px"}>
				<Menu placement={"bottom-end"}>
					<MenuButton>
						<Box
							backgroundColor={backgroundColor}
							borderRadius={10}
							paddingY={1.5}
							paddingX={3}
							display={"flex"}
							alignItems={"center"}
							gap={1.5}
						>
							<Image
								style={{ borderRadius: "50%" }}
								src={user.image!}
								width={30}
								height={30}
								alt={user.name!}
							/>
							<AiOutlineCaretDown />
						</Box>
					</MenuButton>
					<MenuList p={2} fontSize={14}>
						{route.asPath !== "/profile/me" && (
							<Link href={`/profile/me`}>
								<MenuItem justifyContent={"space-between"}>
									<Text>Profile</Text>
									<AiOutlineUser />
								</MenuItem>
							</Link>
						)}
						{route.asPath !== "/sell_a_book" && (
							<Link href={`/sell_a_book`}>
								<MenuItem justifyContent={"space-between"}>
									<Text>Sell your books</Text>
									<AiOutlineBook />
								</MenuItem>
							</Link>
						)}
						<MenuItem
							onClick={() => route.push("/api/auth/signout")}
							justifyContent={"space-between"}
							_hover={{ backgroundColor: "red.500", color: "white" }}
						>
							<Text>Logout</Text>
							<AiOutlineLogout />
						</MenuItem>
					</MenuList>
				</Menu>
			</Box>
		);
	}

	return (
		<Box
			cursor={"pointer"}
			display={"flex"}
			flexDirection={"column"}
			alignItems={"center"}
			onClick={() => route.push(`/api/auth/signin`)}
		>
			<FaUserCircle size={25} />
			<Text fontSize={12}>Login</Text>
		</Box>
	);
}
