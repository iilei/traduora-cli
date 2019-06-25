import axios, { axiosGet } from '../../modules/axios'

const promisedPull = async locale => {
  return axios.get()
}

const pull = async () => {
  /*
  example result:
  [ { id: '0ab1eed9-f98a-465a-93fd-6b3a67353164',
    date:
     { created: '2019-06-23T07:07:06.728Z',
       modified: '2019-06-23T07:07:06.728Z' },
    locale: { code: 'de_DE', region: 'Germany', language: 'German' } },
  { id: '544b64bb-2679-41fb-b39b-5758edbe092a',
    date:
     { created: '2019-06-23T07:06:43.428Z',
       modified: '2019-06-23T07:06:43.428Z' },
    locale:
     { code: 'en_GB', region: 'United Kingdom', language: 'English' } } ]
   */
  const translations = await axiosGet('/translations')
  console.log(translations)
  // await Promise.all(config.locales.map(promisedPull)).then(console.log)
}

export default pull
