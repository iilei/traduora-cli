import { axiosGet } from './axiosInstance'
import config from './config'

const { 'drop-empty': dropEmpty = false } = config


const getExport = async (locale, format) =>
  axiosGet(`/exports?locale=${locale}&format=${format}`)
  .then(result => {

    if (dropEmpty === true) {
      for (const key in result) {
        if (result[key] === '') {
          delete result[key]
        }
      }
    }

    return ({ [locale]: result })
  })

export default getExport
