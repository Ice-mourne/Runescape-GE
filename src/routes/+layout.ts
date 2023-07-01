export const load = async ({ fetch }) => {
  const getSearchData = async (): Promise<[number, string, boolean][]> => {
    const res = await fetch('https://raw.githubusercontent.com/Ice-mourne/RS-Scraper/master/data/searchData.json')
    return res.json()
  }
  return {
    searchData: getSearchData(),
  }
}
