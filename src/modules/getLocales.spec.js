import getLocales from './getLocales'
import { mockAxios } from './__mocks__/axios'

jest.mock('./config', () => ({
  locales: ['de_DE', 'de_BE'],
}))

describe('getLocales', () => {
  it('returns the result of API call reduced to the intersection with desired locales', async () => {
    const responseObj = {
      data: {
        data: [
          {
            id: '0ab1eed9-f98a-xyz-uuid-de_DE',
            locale: {
              code: 'de_DE',
              region: 'Germany',
              language: 'German',
            },
          },
          {
            id: '0ab1eed9-f98a-xyz-uuid-en_GB',
            locale: {
              code: 'en_AI',
              region: 'Anguilla',
              language: 'English',
            },
          },
        ],
      },
    }
    const terms = getLocales()
    mockAxios.mockResponse(responseObj)
    expect(mockAxios.get).toHaveBeenCalledWith('/translations')
    expect(await terms).toEqual({
      de_DE: {
        id: '0ab1eed9-f98a-xyz-uuid-de_DE',
        language: 'German',
        region: 'Germany',
      },
    })
  })
})
