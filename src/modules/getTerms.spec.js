import getTerms from './getTerms'
import { mockAxios } from './__mocks__/axios'

describe('getTerms', () => {
  it('returns the result of API call reduced to Object of ...{[messageKey]: messageID}', async () => {
    const responseObj = {
      data: {
        data: [
          {
            id: '0ab1eed9-f98a-xyz-uuid-header-welcome',
            value: 'header.welcome_message',
          },
          {
            id: '0ab1eed9-f98a-xyz-uuid-footer-imprint',
            value: 'footer.imprint',
          },
        ],
      },
    }
    const terms = getTerms()
    mockAxios.mockResponse(responseObj)
    expect(mockAxios.get).toHaveBeenCalledWith('/terms')
    expect(await terms).toEqual({
      'footer.imprint': '0ab1eed9-f98a-xyz-uuid-footer-imprint',
      'header.welcome_message': '0ab1eed9-f98a-xyz-uuid-header-welcome',
    })
  })
})
