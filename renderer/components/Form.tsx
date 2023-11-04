'use client'

import { Center, Heading, Link } from '@chakra-ui/react'
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
        my={10}>
        <Center>
          <Heading color="#747474" lineHeight={1.1} fontSize={{ base: '1xl', md: '2xl' }} fontWeight={500}>
            Enter the code
          </Heading>
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={() => router.push('/next')}
            textDecoration={"none"}
            bg={'blue.400'}
            color={'white'}
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