import {
  Box,
  Button,
  Center,
  Grid,
  Image,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { useState } from "react"

import { useQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { AxiosError } from "axios"
import ToolBar from "../components/ToolBar"
import { type BaseCountry, Region, getCountriesBasics } from "../utils"

import debounce from "lodash.debounce"

export const Route = createFileRoute("/")({
  component: Home,
})

interface CountriesListProps {
  isSearch: boolean
  regionFilter: Region
  searchTerm: string
}

function CountriesList({
  isSearch,
  regionFilter,
  searchTerm,
}: CountriesListProps) {
  const {
    data: countries,
    isPending,
    isError,
    refetch,
    error,
  } = useQuery<BaseCountry[]>({
    queryKey: ["countries", searchTerm],
    queryFn: () => getCountriesBasics(searchTerm),
    retry: searchTerm ? false : 2,

    staleTime: 1 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  })
  const bgElement = useColorModeValue("ui.white", "ui.darkBlue")
  const textColor = useColorModeValue("ui.veryDarkBlueText", "ui.white")

  if (isError) {
    if (error instanceof AxiosError && error.response) {
      if (error.response.data.message === "Not Found") {
        return (
          <Center>
            <Text color={textColor} fontWeight="600" fontSize="lg">
              Country not found!
            </Text>
          </Center>
        )
      }
    }
    return (
      <Center mt={5} flexDirection="column">
        <Text color="red.500" mb={4}>
          Something went wrong!
        </Text>
        <Button colorScheme="teal" onClick={() => refetch()}>
          Retry
        </Button>
      </Center>
    )
  }

  if (isPending) {
    return (
      <SimpleGrid
        minChildWidth="230px"
        spacing={{ base: "50px", md: "74px" }}
        px={{ base: "70px", md: "80px" }}
        overflow="hidden"
        maxH={{ base: "calc(100vh - 322px)", md: "calc(100vh - 232px)" }}
      >
        {new Array(20).fill(null).map((_, i) => (
          <Box key={i}>
            <Skeleton aspectRatio="264 / 160" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        ))}
      </SimpleGrid>
    )
  }

  const filteredCountries =
    !isSearch && regionFilter !== Region.All
      ? countries.filter((country) => country.region === regionFilter)
      : countries

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(230px, 1fr))"
      gap={{ base: "50px", md: "74px" }}
      px={{ base: "70px", md: "80px" }}
      pb="80px"
    >
      {filteredCountries.map((country) => (
        <Box
          key={country.cca3}
          as={Link}
          to={`/countries/${country.cca3.toLowerCase()}`}
          shadow="sm"
          bg={bgElement}
          overflow="hidden"
          rounded="md"
          h="auto"
          _hover={{
            transform: "scale(1.05)",
            transition: "all .2s",
          }}
        >
          <Box aspectRatio="264 / 160" overflow="auto hidden">
            <Image
              objectFit="cover"
              h="full"
              w="full"
              display="block"
              src={country.flags.svg}
            />
          </Box>
          <Box px="30px" pt="25px" pb="30px" color={textColor}>
            <Text fontSize="18px" fontWeight="800">
              {country.name.official}
            </Text>

            <Text mt="15px" fontWeight="600">
              Population:{" "}
              <Text fontWeight="300" as="span">
                {country.population.toLocaleString()}
              </Text>
            </Text>
            <Text mt="5px" fontWeight="600">
              Region:{" "}
              <Text as="span" fontWeight="300">
                {country.region}
              </Text>
            </Text>
            <Text mt="5px" fontWeight="600">
              Capital:{" "}
              <Text as="span" fontWeight="300">
                {country.capital}
              </Text>
            </Text>
          </Box>
        </Box>
      ))}
    </Grid>
  )
}

function Home() {
  const [regionFilter, setRegionFilter] = useState<Region>(Region.All)
  const [localTerm, setLocalTerm] = useState("")

  const handleSearch = debounce((term: string) => {
    setLocalTerm(term)
  }, 300)

  function selectRegionFilter(val: Region) {
    setRegionFilter(val)
  }

  return (
    <Box>
      <ToolBar
        onSearch={handleSearch}
        selectRegionFilter={selectRegionFilter}
        region={regionFilter}
      />
      <CountriesList
        isSearch={!!localTerm}
        searchTerm={localTerm}
        regionFilter={regionFilter}
      />
    </Box>
  )
}
