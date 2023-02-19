import "../styles/globals.css";
import Nav from "../components/Nav";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { StateContext } from "../lib/context";
import { Chakra, getServerSideProps } from "../styles/Chakra";
import { Box } from "@chakra-ui/react";
import { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps, { session }) {
	return (
		<SessionProvider session={session}>
			<StateContext>
				<Toaster />
				<Chakra cookies={pageProps.cookies}>
					<Nav />
					<Box paddingX={[8, 10, 16, 28]}>
						<Component {...pageProps} />
					</Box>
				</Chakra>
			</StateContext>
		</SessionProvider>
	);
}
export { getServerSideProps } from "../styles/Chakra";

export default App;
