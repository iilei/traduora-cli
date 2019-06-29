import { axiosPost, axiosPatch } from './axiosInstance'
import config from './config'

const errorCodeRegex = /[4-5]\d\d/

const catchFnFactory = (key, value) => ({ message }) => ({
  key,
  value,
  error: {
    message,
    code: (message.match(errorCodeRegex) || [null])[0],
  },
})

const initializeTerm = (key, value) => async () => {
  const catchFn = catchFnFactory(key, value)
  return axiosPost('/terms', { value: key })
    .then(({ data: { id } }) => {
      return axiosPatch(`/translations/${config.locale}`, { termId: id, value })
        .then(() => ({ key, value }))
        .catch(catchFn)
    })
    .catch(catchFn)
}

export default initializeTerm
