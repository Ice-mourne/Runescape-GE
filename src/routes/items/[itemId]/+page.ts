import type { PriceData } from '$lib/types'

export const load = async ({ fetch, params }) => {
  const getItemPrices = async (): Promise<{ [date: string]: PriceData }> => {
    const res = await fetch(
      `https://raw.githubusercontent.com/Ice-mourne/RS-Scraper/master/data/prices/${params.itemId}.json`
    )
    return res.json()
  }
  return {
    priceData: getItemPrices(),
  }
}
