import axios from './axios'

const getAccessToken = async config => {
  const body = {
    grantType: 'client_credentials',
    clientId: config['client-id'],
    clientSecret: config['client-secret'],
  }

  return axios
    .post('/auth/token', body)
    .then(response => {
      return response.data.data.accessToken
    })
    .catch(error => {
      const {
        message,
        name,
        config: { data },
      } = error.toJSON()
      const record = { [name.toLowerCase()]: { message, data } }
      console.log(JSON.stringify(record, null, 2))
    })
}

export default getAccessToken
