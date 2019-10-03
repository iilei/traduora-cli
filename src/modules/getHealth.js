import axios from './axiosInstance'

const introspect = ({ code }) => {
  const known = {
    ECONNREFUSED: `Can not reach "${axios.defaults.baseURL}/health"!`,
  }

  return known[code] || 'EHEALTHCHECK'
}

const getHealth = async () => {
  return axios
    .get('/health')
    .then(response => response.data)
    .catch(error => {
      console.log(introspect(error))
    })
}

export default getHealth
