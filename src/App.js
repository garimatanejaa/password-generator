import React, { useState } from 'react';
import { ChakraProvider, Flex, Box, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import PasswordGenerator from './PasswordGenerator';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleColorMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ChakraProvider>
      <Flex direction="column" align="center" justify="center" minHeight="100vh" bg={isDarkMode ? 'gray.800' : 'gray.400'}>
        <Box width="100%" p={4} bg={isDarkMode ? 'gray.900' : 'blue.500'} color="white">
          <Flex maxW="1200px" align="center" justify="space-between">
            <Heading as="h1" size="lg" letterSpacing="tight">
              Password Generator
            </Heading>
            <IconButton
              icon={isDarkMode ? <SunIcon /> : <MoonIcon />}
              aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              onClick={toggleColorMode}
              variant="ghost"
            />
          </Flex>
        </Box>
        <Box width="100%" maxW="1200px" p={8} mt={8} bg={isDarkMode ? 'gray.900' : 'gray.200'} color={isDarkMode ? 'gray.100' : 'gray.900'} boxShadow="lg" borderRadius="md">
          <PasswordGenerator />
        </Box>
      </Flex>
    </ChakraProvider>
  );
}

export default App;

