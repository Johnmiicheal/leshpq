import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { Button, Link as ChakraLink } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'

export default function SearchPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Search - Lesh Past Questions</title>
      </Head>
      <Container minHeight="90vh">
        <DarkModeSwitch />
        <Image
          src="/images/logo.png"
          alt="Logo image"
          width="200px"
          height="200px"
        />
        <Hero title={`Search for questions`} />
        <Footer>
          <Button
            as={ChakraLink}
            href="/home"
            variant="outline"
            colorScheme="teal"
            rounded="button"
            width="full"
          >
            Go to home page
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  )
}
