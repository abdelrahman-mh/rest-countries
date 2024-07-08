import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react"
import { type ChangeEvent, useState } from "react"
import { IoChevronDownOutline, IoSearchSharp } from "react-icons/io5"

import { TfiClose } from "react-icons/tfi"
import { Region } from "../utils"

const regionMenuData: { region: string; enum: Region }[] = [
  { region: "All", enum: Region.All },
  { region: "Africa", enum: Region.Africa },
  { region: "Americas", enum: Region.America },
  { region: "Asia", enum: Region.Asia },
  { region: "Europe", enum: Region.Europe },
  { region: "Oceania", enum: Region.Oceania },
]

interface ToolBarProps {
  onSearch: (term: string) => void
  selectRegionFilter: (val: Region) => void
  region: Region
}

function ToolBar({ selectRegionFilter, onSearch, region }: ToolBarProps) {
  const [term, setTerm] = useState("")
  const bgElement = useColorModeValue("ui.white", "ui.darkBlue")
  const closeBg = useColorModeValue("gray.200", "whiteAlpha.300")

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setTerm(inputValue)
    onSearch(inputValue)
  }

  const handleClear = () => {
    setTerm("")
    onSearch("")
  }

  return (
    <Flex
      px={{ base: "20px", md: "80px" }}
      mt={{ base: "30px", md: "48px" }}
      mb={{ base: "40px", md: "48px" }}
      justify="space-between"
      flexDir={{ base: "column", md: "row" }}
      alignItems={{ base: "flex-start", md: "center" }}
      gap="50px"
    >
      <InputGroup w="full" maxW={{ base: "full", md: "480px" }} flexShrink={1}>
        <InputLeftElement
          w={{ base: "92px", md: "74px" }}
          h="full"
          pointerEvents="none"
        >
          <Icon as={IoSearchSharp} ml="10%" fontSize="20px" />
        </InputLeftElement>
        <Input
          pl={{ base: "92px", md: "74px" }}
          type="text"
          value={term}
          onChange={handleInputChange}
          placeholder="Search for a country..."
          h="56px"
          borderColor="transparent"
          bg={bgElement}
          shadow="md"
        />
        {term && (
          <InputRightElement h="full">
            <Icon
              w="40px"
              h="40px"
              p="8px"
              cursor="pointer"
              as={TfiClose}
              fontSize="22px"
              _hover={{ bg: closeBg }}
              borderRadius="50%"
              onClick={handleClear}
            />
          </InputRightElement>
        )}
      </InputGroup>
      <Menu>
        <MenuButton
          textAlign="left"
          w={{ base: "248px", md: "200px" }}
          px={{ base: "25px", md: "16px" }}
          h="56px"
          as={Button}
          rightIcon={<Icon as={IoChevronDownOutline} />}
          flexShrink={0}
          bg={bgElement}
          shadow="md"
        >
          {region === Region.All ? "Filter by Region" : region}
        </MenuButton>
        <MenuList bg={bgElement} shadow="md" w={{ base: "248px", md: "200px" }}>
          {regionMenuData.map((region) => (
            <MenuItem
              key={region.region}
              onClick={() => selectRegionFilter(region.enum)}
              px={{ base: "25px", md: "16px" }}
            >
              {region.region}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  )
}

export default ToolBar
