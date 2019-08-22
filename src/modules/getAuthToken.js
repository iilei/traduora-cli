import axios from './axiosInstance'

const getAuthToken = async config => {
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
      const {
        message,
        name,
        config: { data },
      } = error.toJSON()
      const record = { [name.toLowerCase()]: { message, data } }
      console.error(JSON.stringify(record, null, 2))
      process.exit(401)
    })
}

export default getAuthToken
