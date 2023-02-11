import {extendTheme, type ThemeConfig} from '@chakra-ui/react'
import '@fontsource/raleway/700.css'
import '@fontsource/noto-sans/400.css'
import {mode} from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const colors = {
    light: {
        bg: "#fff",
        100: "#fafafa",
        200: "#eaeaea",
        300: "#999",
        400: "#888"
    },
    dark: {
        bg: "#000",
        100: "#111",
        200: "#333",
        300: "#444",
        400: "#666"
    }
}

const styles = {
    global: (props: any) => ({
        body: {
            bg: mode("#fff", "#0d1117")(props),
}
})
}

const fonts = {
    body: `Noto sans, sans-serif`,
        heading: `Raleway, sans-serif`,
        title: 'Merriweather, sans-serif'
}

const theme = extendTheme({ styles, config, colors, fonts })

export default theme