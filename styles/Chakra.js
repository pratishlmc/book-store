import {
    ChakraProvider,
    cookieStorageManagerSSR,
    localStorageManager,
} from '@chakra-ui/react'
import theme from "./theme";

export function Chakra({ cookies, children }) {
    const colorModeManager =
        typeof cookies === 'string'
            ? cookieStorageManagerSSR(cookies)
            : localStorageManager

    return (
        <ChakraProvider resetCSS theme={theme} colorModeManager={colorModeManager}>
            {children}
        </ChakraProvider>
    )
}
export function getServerSideProps({ req }) {
    return {
        props: {
            cookies: req.headers.cookie ?? '',
        },
    }
}