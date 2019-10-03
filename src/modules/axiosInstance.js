import axios from 'axios'

import config from './config'
import cleanPath from './cleanPath'

const { 'base-url': baseURL, 'max-retry': maxRetry } = config

const instance = axios.create({
  baseURL,
})

const setAuthToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
}

const setBaseUrl = (baseUrl = config['base-url']) => {
  instance.defaults.baseURL = baseUrl
  console.log(`baseURL set to ${instance.defaults.baseURL}`)
}

const appendBasePath = (append = '') => {
  const current = instance.defaults.baseURL
  instance.defaults.baseURL = cleanPath(current, append)
  console.log(`baseURL set to ${instance.defaults.baseURL}`)
}

const retry = promise => async (path, data, n = maxRetry) => {
  try {
    return await promise(path, data)
  } catch (err) {
    if (n <= 1) {
      throw new Error(err)
    }
    return promise(path, data, n - 1)
  }
}

const axiosGet = async path => instance.get(path).then(result => result.data)

const axiosPost = async (path, data) => instance.post(path, data).then(result => result.data)

const axiosPatch = async (path, data) => instance.patch(path, data).then(result => result.data)

export default instance
export { setAuthToken, setBaseUrl, appendBasePath, axiosGet, axiosPost, axiosPatch, retry }
