import React, { useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Select,
  Button,
  InputGroup,
  InputRightElement,
  IconButton,
  Text,
  Badge,
  useColorMode,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState('');
  const [visible, setVisible] = useState(false);
  const [theme, setTheme] = useState('default');
  const [copyText, setCopyText] = useState('Copy to Clipboard');
  const { colorMode } = useColorMode();

  const themes = {
    default: '',
    bird: ['Eagle123!', 'Sparrow@2023', 'Falcon#Power', 'Hawk$Force2024', 'Owl*W1sdom!', 'Raven&Str0ngP@ss', 'Condor!Secur1ty', 'Osprey@2Secure', 'Phoenix#2025Pass', 'Vulture$Strong!'],
    country: ['Canada2023!', 'India$Secur3', 'France#2024P@ss', 'Brazil&Auth3ntic', 'Japan*Safe2025', 'Germany!Protected', 'Australia@2026', 'Russia#3ncrypt!', 'Italy*Secur!ty20', 'Spain&2027Saf3', 'China!P@ss2028', 'Egypt@1S3cur3', 'Greece#2029!Safe', 'Argentina$Strong2!'],
    name: ['Ananya@2023Pass', 'Bhavya#S3cure!', 'Chirag*2024Pass', 'Devika$Str0ng!', 'Esha!Saf3@2025', 'Farhan#2026P@ss', 'Gaurav&Auth3ntic', 'Hina*Secur3!', 'Ishan$P@ssword20', 'Janvi#2027!', 'Karthik@Saf3&2028', 'Lavanya!Str0ng2!', 'Mihir#2029P@ss', 'Naina$Auth3nt1c', 'Omkar@2030S3cure'],
    easy: ['password@2023!', '123456#Secur3', 'abcdef*2024P@ss', 'letmein$Str0ng!', 'welcome!2025Saf3', 'qwerty#Secur3!', 'monkey*2026P@ss', 'iloveyou$Str0ng!', 'sunshine!2027Saf3', 'chocolate#Secur3!', 'football*2028P@ss', 'baseball$Str0ng!', 'security!2029Saf3', 'dragon#P@ssword20', 'freedom$20230!'],
  };

  const generatePassword = () => {
    let generatedPassword = '';

    if (theme !== 'default' && themes[theme]) {
      generatedPassword = themes[theme][Math.floor(Math.random() * themes[theme].length)];
    } else {
      let generatedLength = Math.floor(Math.random() * 9) + 8; // Random length between 8 to 16 characters
      const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

      let characterSet = '';
      if (includeUppercase) characterSet += upperCaseLetters;
      if (includeLowercase) characterSet += lowerCaseLetters;
      if (includeNumbers) characterSet += numbers;
      if (includeSymbols) characterSet += symbols;

      for (let i = 0; i < generatedLength; i++) {
        const randomIndex = Math.floor(Math.random() * characterSet.length);
        generatedPassword += characterSet[randomIndex];
      }
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  };

  const calculateStrength = (password) => {
    let strength = '';
    if (password.length >= 12 && includeUppercase && includeLowercase && includeNumbers && includeSymbols) {
      strength = 'Strong';
    } else if (password.length >= 8 && (includeUppercase || includeLowercase) && (includeNumbers || includeSymbols)) {
      strength = 'Medium';
    } else {
      strength = 'Weak';
    }
    setStrength(strength);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopyText('Copied to Clipboard');
    setTimeout(() => {
      setCopyText('Copy to Clipboard');
    }, 2000);
  };

  return (
    <Box p={6}>
      <Heading as="h2" size="md" mb={4}>
        Password Generator
      </Heading>
      <Stack spacing={4} mb={4}>
        <FormControl>
          <FormLabel>Length:</FormLabel>
          <Input
            type="number"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            min="4"
            max="20"
            disabled={theme !== 'default'}
          />
        </FormControl>
        <Checkbox isChecked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} isDisabled={theme !== 'default'}>
          Include Uppercase
        </Checkbox>
        <Checkbox isChecked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)} isDisabled={theme !== 'default'}>
          Include Lowercase
        </Checkbox>
        <Checkbox isChecked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} isDisabled={theme !== 'default'}>
          Include Numbers
        </Checkbox>
        <Checkbox isChecked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)} isDisabled={theme !== 'default'}>
          Include Symbols
        </Checkbox>
        <Select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="default">Default</option>
          <option value="bird">Bird</option>
          <option value="country">Country</option>
          <option value="name">Name</option>
          <option value="easy">Easy</option>
        </Select>
      </Stack>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} align="center" mb={4}>
        <InputGroup>
          <Input
            type={visible ? 'text' : 'password'}
            value={password}
            readOnly
            pr="4.5rem"
            borderRadius="md"
            borderColor="gray.300"
            bg="gray.100"
            color="gray.800"
            w={{ base: '100%', md: 'auto' }}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              variant="outline"
              aria-label={visible ? 'Hide password' : 'Show password'}
              icon={visible ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setVisible(!visible)}
              color={colorMode === 'dark' ? 'white' : 'gray.600'} // Adjust icon color based on colorMode
            />
          </InputRightElement>
        </InputGroup>
        <Button
          onClick={generatePassword}
          colorScheme={colorMode === 'dark' ? 'teal' : 'blue'}
          w={{ base: '100%', md: 'auto' }}
          size={{ base: 'lg', md: 'md' }}
        >
          Generate Password
        </Button>
      </Stack>
      <Text mb={2}>
        Strength: <Badge colorScheme={strength === 'Strong' ? 'green' : strength === 'Medium' ? 'yellow' : 'red'}>{strength}</Badge>
      </Text>
      <Button onClick={copyToClipboard} colorScheme="teal">
        {copyText}
      </Button>
    </Box>
  );
};

export default PasswordGenerator;
