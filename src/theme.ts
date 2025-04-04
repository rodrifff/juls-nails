import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
  colors: {
    brand: {
      50: '#f0e4ff',
      100: '#c8b3ff',
      200: '#a081ff',
      300: '#784fff',
      400: '#501dff',
      500: '#3700e6',
      600: '#2b00b4',
      700: '#1f0082',
      800: '#130050',
      900: '#070020',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
        color: props.colorMode === 'dark' ? 'white' : 'gray.800',
      },
    }),
  },
})

export { theme } 