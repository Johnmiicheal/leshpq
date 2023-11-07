import React from "react";
import Head from "next/head";
import { Button, Link as ChakraLink, Flex, Image, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";

import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { SearchIcon } from "@chakra-ui/icons";

export default function SearchPage() {
  return (
    <React.Fragment>
      <Head>
        <title>Search - Lesh Past Questions</title>
      </Head>
      <Container h="100vh">
        <DarkModeSwitch />
        <Flex direction="column" h="full" align="center" justify="center">
          <Image
            src="/leshlogo.png"
            alt="Logo image"
            width="100px"
            height="100px"
          />
          <Text fontSize={"3vw"} mt={2}>Search for questions</Text>
          <InputGroup mt={10}>
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input type="text" borderRadius="full" />
          </InputGroup>
        </Flex>
        <Footer>
          <Button
            as={ChakraLink}
            href="/add"
            variant="outline"
            colorScheme="blue"
            rounded="button"
            width="full"
          >
            Add new question
          </Button>
        </Footer>
      </Container>
    </React.Fragment>
  );
}
