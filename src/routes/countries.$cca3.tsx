import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Image,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { createFileRoute, useParams } from "@tanstack/react-router"
import { Link } from "@tanstack/react-router"
import { AxiosError } from "axios"

import { getBordersCountries, getCountry } from "../utils"

import { MdOutlineKeyboardBackspace } from "react-icons/md"

export const Route = createFileRoute("/countries/$cca3")({
  component: CountryDetails,
})

function Borders({
  cca3,
  cca3Borders,
}: { cca3: string; cca3Borders: string[] }) {
  const {
    data: borders,
    isPending,
    isError,
    refetch,
  } = useQuery({
    queryKey: [cca3, "borders"],
    queryFn: () => getBordersCountries(cca3Borders),
    retry: false,
  })
  const bgElement = useColorModeValue("ui.white", "ui.darkBlue")
  const textColor = useColorModeValue("ui.veryDarkBlueText", "ui.white")

  return (
    <>
      {isError ? (
        <>
          <Text color="red.500">Failed to load bordering countries</Text>
          <Button colorScheme="teal" onClick={() => refetch()}>
            Retry
          </Button>
        </>
      ) : isPending ? (
        <Spinner size="md" color="teal.500" />
      ) : (
        borders.map((e) => (
          <Button
            key={e.cca3}
            as={Link}
            to={`/countries/${e.cca3.toLowerCase()}`}
            bg={bgElement}
            shadow="md"
            color={textColor}
          >
            {e.name.common}
          </Button>
        ))
      )}
    </>
  )
}

function Country({ cca3 }: { cca3: string }) {
  const {
    data: country,
    isError,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: [cca3],
    queryFn: () => getCountry(cca3),
    retry: false,
  })

  const textColor = useColorModeValue("ui.veryDarkBlueText", "ui.white")

  if (isError) {
    if (error instanceof AxiosError) {
      if (error?.response) {
        return <Text>Country Not Found!</Text>
      }
    }
    return (
      <Center>
        <VStack spacing={4}>
          <Text color="red.500">Failed to load country data</Text>
          <Button colorScheme="teal" onClick={() => refetch()}>
            Retry
          </Button>
        </VStack>
      </Center>
    )
  }

  return (
    <>
      {isPending ? (
        <Center>
          <Spinner size="xl" color="teal.500" />
        </Center>
      ) : (
        <SimpleGrid
          mb="80px"
          maxW="1440px"
          w="full"
          mx="auto"
          columns={{ base: 1, md: 2 }}
          alignItems="center"
          px={{ base: "20px", md: "80px" }}
          columnGap={{ md: "50px", lg: "80px", xl: "110px", "2xl": "140px" }}
          rowGap="60px"
        >
          <Box>
            <Image src={country.flags.svg} objectFit="cover" />
          </Box>
          <Box color={textColor} lineHeight="30px">
            <Text fontSize="30px" fontWeight="800">
              {country.name.official}
            </Text>
            <Flex
              justify="space-between"
              flexDir={{ base: "column", xl: "row" }}
              rowGap="40px"
              mt="35px"
              alignItems="flex-start"
            >
              <Box>
                <Text fontWeight="600">
                  Native Name:{" "}
                  <Text as="span" fontWeight="300">
                    {Object.values(country.name.nativeName)[0].common}
                  </Text>
                </Text>
                <Text fontWeight="600">
                  Population:{" "}
                  <Text as="span" fontWeight="300">
                    {country.population.toLocaleString()}
                  </Text>
                </Text>
                <Text fontWeight="600">
                  Region:{" "}
                  <Text as="span" fontWeight="300">
                    {country.region}
                  </Text>
                </Text>
                <Text fontWeight="600">
                  Sub Region:{" "}
                  <Text as="span" fontWeight="300">
                    {country.subregion}
                  </Text>
                </Text>
                <Text fontWeight="600">
                  Capital:{" "}
                  <Text as="span" fontWeight="300">
                    {country.capital}
                  </Text>
                </Text>
              </Box>
              <Box>
                <Text fontWeight="600">
                  Top Level Domain:{" "}
                  <Text as="span" fontWeight="300">
                    {country.tld[0]}
                  </Text>
                </Text>
                <Text fontWeight="600">
                  Currencies:{" "}
                  <Text as="span" fontWeight="300">
                    {Object.values(country.currencies)
                      .map((e) => e.name)
                      .join(", ")}
                  </Text>
                </Text>
                <Text fontWeight="600">
                  Languages:{" "}
                  <Text as="span" fontWeight="300">
                    {Object.values(country.languages).join(", ")}
                  </Text>
                </Text>
              </Box>
            </Flex>
            <HStack mt={{ base: "40px", xl: "90px" }} wrap="wrap">
              <Text
                whiteSpace="nowrap"
                flexBasis={{ base: "100%", md: "auto" }}
                fontWeight="600"
              >
                Border Countries:{" "}
              </Text>
              {country.borders.length !== 0 ? (
                <Borders cca3={cca3} cca3Borders={country.borders} />
              ) : (
                <Text>N/A</Text>
              )}
            </HStack>
          </Box>
        </SimpleGrid>
      )}
    </>
  )
}

function CountryDetails() {
  const cca3 = useParams({
    from: "/countries/$cca3",
    select: (params) => params.cca3,
  }).toLowerCase()
  const bgElement = useColorModeValue("ui.white", "ui.darkBlue")
  const textColor = useColorModeValue("ui.veryDarkBlueText", "ui.white")

  return (
    <>
      <Button
        bg={bgElement}
        color={textColor}
        as={Link}
        to="/"
        mx={{ base: "20px", md: "80px" }}
        mt={{ base: "40px", md: "80px" }}
        mb={{ base: "60px", md: "80px" }}
        shadow="lg"
        leftIcon={<Icon fontSize="22px" as={MdOutlineKeyboardBackspace} />}
        px="30px"
      >
        Back
      </Button>
      <Country cca3={cca3} />
    </>
  )
}
