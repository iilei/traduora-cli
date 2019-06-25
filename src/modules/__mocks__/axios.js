import mockAxios from 'jest-mock-axios'

const instance = mockAxios.create({
  baseURL: 'https://example.com/test/',
})

const setAuthToken = jest.fn(token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`
})

const setBaseUrl = jest.fn(baseUrl => {
  instance.defaults.baseURL = baseUrl
})

const axiosGet = async path =>
  instance
    .get(path)
    .then(result => result.data.data)
    .catch(err => {
      throw new Error(err)
    })

export default instance
export { setAuthToken, setBaseUrl, axiosGet, mockAxios }
