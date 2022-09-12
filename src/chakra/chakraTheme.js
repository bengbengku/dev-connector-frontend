import { extendTheme } from '@chakra-ui/react';
import '@fontsource/open-sans/300.css';
import '@fontsource/open-sans/400.css';
import '@fontsource/open-sans/700.css';

const buttonSelectStyles = {
  baseStyle: {
    borderRadius: '60px',
    color: 'primaryColor.100',
  },
  sizes: {
    sm: {
      fontSize: '8pt',
    },
    md: {
      fontSize: '10pt',
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: 'white',
      bg: 'blue.800',
      _hover: {
        bg: 'blue.600',
      },
    },
    outline: {
      color: 'blue.800',
      border: '1px solid',
      borderColor: 'blue.800',
    },
    oauth: {
      height: '34px',
      border: '1px solid',
      borderColor: 'gray.300',
      _hover: {
        bg: 'gray.50',
      },
    },
  },
};

export const theme = extendTheme({
  colors: {
    brand: {
      100: '#FF3c00',
      200: '#DEE2E6',
    },
    transparent: 'transparent',
    black: '#000',
    white: '#fff',
  },
  fonts: {
    body: `'Open Sans', sans-serif`,
  },
  styles: {
    global: () => ({
      body: {
        bg: 'brand.200',
      },
    }),
  },
  components: {
    Button: { ...buttonSelectStyles },
  },
});
