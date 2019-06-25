import { axiosGet } from './axiosInstance'

const getTerms = async () =>
  axiosGet('/terms').then(({ data: result }) =>
    result.reduce((acc, { id, value }) => ({ ...acc, [value]: id }), {}),
  )

export default getTerms
