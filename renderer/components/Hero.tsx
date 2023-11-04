import { Flex, Heading, useColorModeValue } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    color={useColorModeValue('#000A16', 'gray.300')} 
  >
    <Heading fontSize="4vw" fontWeight={500} mt={2}>{title}</Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'lesh-past-questions',
}
