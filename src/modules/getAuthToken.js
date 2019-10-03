import axios from './axiosInstance'
import config from './config'

const getAuthToken = async () => {
  return axios
    .post('/auth/token', {
      grant_type: 'client_credentials',
      client_id: config['client-id'],
      client_secret: config['client-secret'],
    })
    .then(response => {
      return response.data.access_token
    })
    .catch(error => {
      console.error(error.response?.statusText || 'getAuthToken failed')
      process.exit(error.response?.status || 2)
    })
}

export default getAuthToken
