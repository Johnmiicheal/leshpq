import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => (
  <Flex
    direction="column"
    align="center"
    justify="center"
    bg="gray.50"
    color="black"
    _dark={{
      bg: 'gray.800',
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
)
