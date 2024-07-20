export interface Global {
  region: any[] | null
  setRegion: (region: any[] | null) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  resData: boolean
  setResData: (data: boolean) => void
}