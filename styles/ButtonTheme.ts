import {mode} from "@chakra-ui/theme-tools";
export const ButtonStyles = {
    variants: {
        brand: (props: any) => ({
            bg: mode("#000", "#fff")(props),
            color: mode("#fff", "#000")(props),
            borderColor: mode("#000", "#fff")(props),
            borderWidth: 2,
            fontWeight: "normal",
            display: "flex",
            alignItems: "center",
            _hover: {
                bg: "transparent",
                color: mode("dark.100", "light.100")(props),
                fontWeight: "semiBbold",
            }
        })
    }
}