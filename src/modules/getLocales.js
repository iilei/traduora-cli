import { axiosGet } from './axiosInstance'
import config from './config'

const getLocales = async () =>
  axiosGet('/translations').then(({ data: result }) =>
    result.reduce(
      (acc, { id, locale: { code } }) => ({
        ...acc,
        // keep only locales that are whitelisted in config
        ...(config.locales.includes(code) ? { [code]: id } : {}),
      }),
      {},
    ),
  )

export default getLocales
