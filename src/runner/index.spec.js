jest.mock('../modules/getAuthToken', () => jest.fn(() => 'JWT'))
jest.mock('../modules/axiosInstance', () => ({
  __esModule: true,
  setAuthToken: jest.fn(() => {}),
  setBaseUrl: jest.fn(() => {}),
  appendBasePath: jest.fn(() => {}),
  default: {
    get: jest.fn(() => Promise.resolve({ data: { version: '0.13.0' } })),
    defaults: {
      baseURL: 'https://traduora.example.com/',
    },
  },
}))

describe('runner', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../tasks', jest.fn(() => ({ myTask: jest.fn(() => {}) })))
  })

  it('should invoke the desired task', async () => {
    const taskMock = require('../tasks').myTask
    const { appendBasePath, setAuthToken } = require('../modules/axiosInstance')
    const runner = require('./index').default

    await runner('myTask', '/foo')

    expect(setAuthToken.mock.calls[0][0]).toBe('JWT')
    expect(appendBasePath.mock.calls[0][0]).toBe('/projects/xyz/')
    expect(taskMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        'client-id': 'test',
        'pull-to': '/abs-path/foo/intl/pull/<locale>.<hash:6>.json',
      }),
    )
  })
})
