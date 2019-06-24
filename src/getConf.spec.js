import cosmiconfigMock from 'cosmiconfig'

import getConf from './getConf'
import { searchSync } from '../__mocks__/cosmiconfig'

jest.mock('cosmiconfig')

describe('getConf with default env-prefix', () => {
  it('calls cosmiconfig with the correct setup', () => {
    expect(() => getConf()).not.toThrow()
    expect(searchSync.mock.calls.length).toEqual(1)
    expect(cosmiconfigMock).toHaveBeenCalledWith('traduora', {
      searchPlaces: [
        'package.json',
        '.traduorarc',
        '.traduorarc.json',
        '.traduorarc.yaml',
        '.traduorarc.yml',
        '.traduorarc.js',
        'traduora.config.js',
      ],
    })
  })

  it('mixes package.json and process.env', () => {
    expect(getConf()).toEqual(
      expect.objectContaining({
        'client-id': 'test',
        'api-base': 'https://traduora.example.com/some-path/',
      }),
    )
  })
})
