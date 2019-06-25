import axios from 'axios'

import config from './config'

const { 'base-url': baseURL } = config

const instance = axios.create({
  baseURL,
})

const setAuthToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

const setBaseUrl = baseUrl => {
  instance.defaults.baseURL = baseUrl
}

const axiosGet = async path =>
  instance
    .get(path)
    .then(result => result.data)
    .catch(err => {
      throw new Error(err)
    })

export default instance
export { setAuthToken, setBaseUrl, axiosGet }
