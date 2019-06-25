import { axiosGet } from './axiosInstance'

const getExport = async (locale, format) =>
  axiosGet(`/exports?locale=${locale}&format=${format}`).then(result => ({ [locale]: result }))

export default getExport
