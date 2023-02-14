import "../styles/globals.css";
import { createClient, Provider } from "urql";
import Nav from "../components/Nav";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";
import {StateContext} from "../lib/context";
import theme from "../styles/theme";
import {Chakra} from "../styles/Chakra";
import {Box} from "@chakra-ui/react";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
function MyApp({ Component, pageProps }) {
  return (
      <Chakra cookies={pageProps.cookies}>
            <UserProvider>
                <StateContext>
                    <Provider value={client}>
                        <Nav />
                        <Toaster />
                        <Box paddingX={[8, 10, 16, 28]}>
                            <Component {...pageProps} />
                        </Box>
                    </Provider>
                </StateContext>
            </UserProvider>
      </Chakra>
  );
}
export { getServerSideProps } from "../styles/Chakra";

export default MyApp;
