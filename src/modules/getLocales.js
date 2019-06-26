import { axiosGet } from './axiosInstance'
import config from './config'

const getLocales = async () =>
  axiosGet('/translations').then(({ data: result }) =>
    result.reduce(
      (acc, { id, locale: { code, region, language } }) => ({
        ...acc,
        // keep only locales that are whitelisted in config
        ...(config.locales.includes(code) ? { [code]: { region, language, id } } : {}),
      }),
      {},
    ),
  )

export default getLocales
