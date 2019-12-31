import axios from './axiosInstance'

const introspect = error => {
  const known = {
    ECONNREFUSED: `Can not reach "${axios.defaults.baseURL}/health"!`,
  }

  return known[error.code] || JSON.stringify(error)
}

const getHealth = async () => {
  return axios
    .get('/health', {
      validateStatus: status => status < 300,
    })
    .then(response => response.data)
    .catch(error => {
      console.log(introspect(error))
    })
}

export default getHealth
