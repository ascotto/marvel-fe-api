export type Comic = {
  title: string
  id: string
  thumbnail: {
    path: string
    extension: string
  }
  prices: []
}

export type Character = {
  name: string
}

export type Creators = {
  name: string
}

export type ComicDates = {
  date: Date
}

export interface ComicDetails extends Comic {
  characters: {
    items: Character[]
  }
  creators: {
    items: Creators[]
  }
  format: string
  pageCount: number
  dates: ComicDates[]
  diamondCode: string
}
