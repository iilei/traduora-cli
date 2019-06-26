import { axiosPost, axiosPatch } from './axiosInstance'
import config from './config'

const initializeTerm = async (key, value) => {
  axiosPost('/terms', { value: key }).then(({ data: { id } }) => {
    axiosPatch(`/translations/${config.locale}`, { termId: id, value })
  })
}

export default initializeTerm
