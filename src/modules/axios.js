import axios from 'axios'

import getConfig from '../getConf'

const { 'api-base': baseURL } = getConfig()

const instance = axios.create({
  baseURL,
})

export default instance
