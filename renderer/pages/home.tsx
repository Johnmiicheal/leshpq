import React from 'react'
import Head from 'next/head'
// import Image from 'next/image'
import { Flex, Image } from '@chakra-ui/react'

import { Container } from '../components/Container'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { Footer } from '../components/Footer'
import { Hero } from '../components/Hero'
import LoginForm from '../components/Form'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Leshpq</title>
      </Head>
      <Container h="100vh" overflow="hidden">
        <DarkModeSwitch />
        <Flex direction="column" align="center" justify="center" h="full">
          <Image          
            src="/leshlogo.png"
            alt="Logo image"
            width="100px"
            height="100px"
          />
          <Hero title={`Lesh Question Bank`} />
          <LoginForm />

        </Flex>
        <Footer>
        
        </Footer>
      </Container>
    </React.Fragment>
  )
}
