'use client'
import { useState } from 'react'
import { Center, Heading } from '@chakra-ui/react'
import {
  Button,
  FormControl,
  Flex,
  Input,
  Stack,
  useColorModeValue,
  HStack,
} from '@chakra-ui/react'
import { PinInput, PinInputField } from '@chakra-ui/react'
import { useRouter } from 'next/router'

export default function LoginForm() {
  const router = useRouter();
  const initialPinValues = ['', '', '', '', '', ''];
  const [pinValues, setPinValues] = useState(initialPinValues);
  const [loading, setLoading] = useState(false);

  // Function to handle changes in PinInputFields
  const handlePinInputChange = (index, value) => {
    const newPinValues = [...pinValues];
    newPinValues[index] = value;
    setPinValues(newPinValues);
  };

  const handleSubmit = () => {
    console.log(pinValues)
    setLoading(true)
    router.push('/search')
  }

  // Determine whether all PinInputFields are filled
  const isButtonDisabled = pinValues.some(value => value === '');

  return (
    <Flex
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', '')} 
      w={{ base: 'full', md: 'lg', lg: 'xl'}}
      px={5}
      >
      <Stack
        spacing={5}
        w={'full'}
        bg={useColorModeValue('white', 'gray.700')}
        rounded={'xl'}
        border="1px solid #d4d4d4"
        p={6}
        my={10}
        >
        <Center>
          <Heading color="#747474" lineHeight={1.1} fontSize={{ base: '1xl', md: '2xl' }} fontWeight={500}>
            Enter the code
          </Heading>
        </Center>
        <FormControl>
          <Center>
          <HStack>
            <PinInput>
              {pinValues.map((value, index) => (
                <PinInputField key={index} value={value} onChange={(e) => handlePinInputChange(index, e.target.value)} />
              ))}
            </PinInput>
          </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={handleSubmit}
            isLoading={loading}
            textDecoration={"none"}
            bg={'blue.400'}
            color={'white'}
            isDisabled={isButtonDisabled}
            _hover={{
              bg: 'blue.500',
            }}>
            Continue
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}