import "../styles/globals.css";
import { createClient, Provider } from "urql";
import Nav from "../components/Nav";
import { UserProvider } from "@auth0/nextjs-auth0";
import { Toaster } from "react-hot-toast";
import {ChakraProvider, useColorMode, useColorModeValue} from '@chakra-ui/react'
import {StateContext} from "../lib/context";
import theme from "../styles/theme";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });
function MyApp({ Component, pageProps }) {
        const lightTheme = {
            background: "#ffffff",
            100: "#fafafa",
            200: "#eaeaea",
            300: "#999",
            400: "#888"
        }
        const darkTheme = {
            background: "#ffffff",
            one: "#fafafa",
            two: "#eaeaea",
            three: "#999",
            four: "#888"
        }
    const primary = useColorModeValue(lightTheme, darkTheme)
  return (
    <UserProvider>
        <StateContext>
            <ChakraProvider theme={theme}>
                <Provider value={client}>
                    <Toaster />
                    <Nav />
                    <Component primary={primary} {...pageProps} />
                </Provider>
            </ChakraProvider>
        </StateContext>
    </UserProvider>
  );
}

export default MyApp;
