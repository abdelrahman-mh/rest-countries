import axios from "axios"

const API_URL = "https://restcountries.com/v3.1"

export enum Region {
  All = "All", // for no filter
  Asia = "Asia",
  Africa = "Africa",
  Europe = "Europe",
  America = "Americas",
  Oceania = "Oceania",
}

export interface BaseCountry {
  cca3: string
  flags: {
    png: string
    svg: string
    alt: string
  }
  name: {
    common: string
    official: string
    nativeName: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  population: number
  region: Region
  capital: string[]
}
export interface BorderCountriesFields {
  name: BaseCountry["name"]
  cca3: BaseCountry["cca3"]
}

export interface Country extends BaseCountry {
  subregion: string
  tld: string[] // Top-level domain
  currencies: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  languages: {
    [key: string]: string
  }
  borders: string[]
}

function getFields<T>(fields: Array<keyof T>): string {
  return fields.join(",")
}

// Axios Services
export async function getCountriesBasics(
  term?: string,
): Promise<BaseCountry[]> {
  const fields = getFields<BaseCountry>([
    "cca3",
    "flags",
    "name",
    "population",
    "region",
    "capital",
  ])
  let url = `${API_URL}/all?fields=${fields}`
  if (term) {
    url = `${API_URL}/name/${term}?fields=${fields}`
  }

  const response = await axios.get<BaseCountry[]>(url)
  return response.data
}

export async function getCountry(cca3: string): Promise<Country> {
  const fields = getFields<Country>([
    "cca3",
    "flags",
    "name",
    "population",
    "region",
    "capital",
    "subregion",
    "tld",
    "currencies",
    "languages",
    "borders",
  ])
  const response = await axios.get<Country>(
    `${API_URL}/alpha/${cca3}?fields=${fields}`,
  )
  return response.data
}
export async function getBordersCountries(
  codes: string[],
): Promise<BorderCountriesFields[]> {
  const fields = getFields<BorderCountriesFields>(["name", "cca3"])
  const response = await axios.get<BorderCountriesFields[]>(
    `${API_URL}/alpha?codes=${codes.join(",")}&fields=${fields}`,
  )
  return response.data
}
