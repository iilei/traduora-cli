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

const retry = promise => async (path, data, n = 5) => {
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
export { setAuthToken, setBaseUrl, axiosGet, axiosPost, axiosPatch, retry }
