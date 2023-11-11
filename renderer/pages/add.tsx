import React, { useState } from "react";
import Head from "next/head";
import {
	Button,
	Link as ChakraLink,
	Flex,
	Image,
	Input,
	Select,
	InputLeftElement,
	Text,
	Textarea,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Footer } from "../components/Footer";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

export default function AddPage() {
	const [editorValue, setEditorValue] = useState("");
	// Get the current year
	const currentYear = new Date().getFullYear();

	// Generates the array of years from 1970 to the current year
	const years = Array.from(
		{ length: currentYear - 1969 },
		(_, index) => 1970 + index
	);

	// Initial value (you can set a default value or use state to manage it)
	const initialValue = currentYear; // Set to the current year by default

	// State to manage the selected year
	const [selectedYear, setSelectedYear] = useState(initialValue);

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedYear(parseInt(event.target.value));
	};

	const handleAddQuestion = () => {
		// Do the thing to add question here
		console.log(editorValue);
	};

	return (
		<React.Fragment>
			<Head>
				<title>Add Question - Lesh Questions Bank</title>
			</Head>
			<Container h="100vh">
				<DarkModeSwitch />
				<Flex gap="2" align="center" position="fixed" top={4} left={4}>
					<Image
						src="/leshlogo.png"
						alt="Logo image"
						width="70px"
						height="70px"
					/>
					<Text fontSize={"2.4rem"} mt={2}>
						Add new questions
					</Text>
				</Flex>
				<Flex
					direction="column"
					gap={4}
					h="full"
					align="center"
					justify="center"
				>
					<Input
						type="text"
						borderRadius="none"
						placeholder="Enter question title"
					/>
					<Flex gap={3} w="full">
						<Select placeholder="Select question type">
							<option value="option1">WAEC</option>
							<option value="option2">JAMB</option>
							<option value="option2">NECO</option>
							<option value="option3">GCE</option>
						</Select>
						<Select value={selectedYear} onChange={handleChange}>
							{years.map((year) => (
								<option key={year} value={year}>
									{year}
								</option>
							))}
						</Select>
					</Flex>
					<ReactQuill
						value={editorValue}
						placeholder="Enter Question..."
						onChange={(value) => setEditorValue(value)}
						modules={{
							toolbar: [
								[{ header: [1, 2, false] }],
								["bold", "italic", "underline"],
								["image", "code-block"],
								[{ list: "ordered" }, { list: "bullet" }],
							],
						}}
						theme="snow"
					/>

					<Button
						mt={10}
						onClick={handleAddQuestion}
						variant="solid"
						colorScheme="blue"
						rounded="button"
						width="full"
					>
						Add Question
					</Button>
				</Flex>
				<Footer>
					<Button
						as={ChakraLink}
						href="/search"
						variant="outline"
						colorScheme="blue"
						rounded="button"
						width="full"
					>
						Go to Home
					</Button>
				</Footer>
			</Container>
		</React.Fragment>
	);
}
