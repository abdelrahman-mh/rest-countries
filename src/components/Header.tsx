import {
  Button,
  HStack,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"

import { HiOutlineMoon } from "react-icons/hi"
import { IoMoonSharp } from "react-icons/io5"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgElement = useColorModeValue("ui.white", "ui.darkBlue")
  const textColor = useColorModeValue("ui.veryDarkBlueText", "ui.white")

  return (
    <>
      <HStack
        bg={bgElement}
        justify="space-between"
        px={{ base: "20px", md: "80px" }}
        h={{ base: "90px", md: "80px" }}
        shadow="md"
      >
        <Heading
          fontSize={{ base: "17px", md: "24px" }}
          fontWeight="800"
          color={textColor}
        >
          Where in the world?
        </Heading>
        <Button
          onClick={toggleColorMode}
          leftIcon={colorMode === "light" ? <HiOutlineMoon /> : <IoMoonSharp />}
          bg="transparent"
          color={textColor}
        >
          Dark Mode
        </Button>
      </HStack>
    </>
  )
}
export default Header
