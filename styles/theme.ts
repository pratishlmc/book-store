import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import '@fontsource/raleway/700.css'
import '@fontsource/noto-sans/400.css'

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const colors = {
    brand: {
        primary: "#eaeaea",
        //     {
        //     background: "#ffffff",
        //         100: "#fafafa",
        //         200: "#eaeaea",
        //         300: "#999",
        //         400: "#888"
        // },
    },
}

const fonts = {
    body: `Noto sans, sans-serif`,
        heading: `Raleway, sans-serif`,
        title: 'Merriweather, sans-serif'
}

const theme = extendTheme({ config, colors, fonts })

export default theme