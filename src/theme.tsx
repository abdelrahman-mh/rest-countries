import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: (props: any) => ({
      "html, body": {
        bg:
          props.colorMode === "dark"
            ? props.theme.colors.ui.veryDarkBlueBg
            : props.theme.colors.ui.veryLightGray,
      },
    }),
  },
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  colors: {
    ui: {
      darkBlue: "hsl(209, 23%, 22%)", // Dark Mode Elements
      veryDarkBlueBg: "hsl(207, 26%, 17%)", // Dark Mode Background
      veryDarkBlueText: "hsl(200, 15%, 8%)", // Light Mode Text
      darkGray: "hsl(0, 0%, 52%)", // Light Mode Input
      veryLightGray: "hsl(0, 0%, 98%)", // Light Mode Background
      white: "hsl(0, 0%, 100%)", // Dark Mode Text & Light Mode Elements
    },
  },
  fonts: {
    heading: "Nunito Sans, sans-serif",
    body: "Nunito Sans, sans-serif",
  },
})

export default theme
