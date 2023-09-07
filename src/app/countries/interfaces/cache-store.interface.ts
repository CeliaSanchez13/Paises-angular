import { Country } from "./country"
import { Region } from "./region.type"

//Interface principal
export interface CacheStore{
    byCapital: TermCountries,
    byCountries: TermCountries,
    byRegion: RegionCountries
    
}

//Interfaces secundarias
export interface TermCountries {
    term:string,
    countries: Country[]
}

export interface RegionCountries {
    region:Region,
    countries: Country[]
}