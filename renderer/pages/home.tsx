import React from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useColorModeValue } from '@chakra-ui/react'

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
      <Container minHeight="90vh" mt={5}>
        <DarkModeSwitch />
        <Image
          src="/leshlogo.png"
          alt="Logo image"
          width="100px"
          height="100px"
        />
        <Hero title={`Lesh Past Questions`} />
        <LoginForm />
        <Footer>
        
        </Footer>
      </Container>
    </React.Fragment>
  )
}
