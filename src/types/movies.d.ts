export interface MovieListItem {
  sourceType: string
  name: string
  dataFile: string
}

export interface Movie {
  [key: string]: string | null | any | undefined
  title: string
  description: string | null
  keywords: string | null
  source: string
  inherentProperties: any | undefined
}
