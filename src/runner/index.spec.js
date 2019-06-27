jest.mock('../modules/getAuthToken', () => jest.fn(() => 'JWT'))
jest.mock('../modules/axiosInstance', () => ({
  setAuthToken: jest.fn(() => {}),
  setBaseUrl: jest.fn(() => {}),
}))

describe('runner', () => {
  beforeEach(() => {
    jest.resetModules()
    jest.doMock('../tasks', jest.fn(() => ({ myTask: jest.fn(() => {}) })))
  })

  it('should invoke the desired task', async () => {
    const taskMock = require('../tasks').myTask
    const { setBaseUrl, setAuthToken } = require('../modules/axiosInstance')
    const runner = require('./index').default

    await runner('myTask', '/foo')

    expect(setAuthToken.mock.calls[0][0]).toBe('JWT')
    expect(setBaseUrl.mock.calls[0][0]).toBe('https://traduora.example.com/some-path/projects/xyz/')
    expect(taskMock.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        'client-id': 'test',
        'pull-to': '/abs-path/foo/intl/pull/<locale>.<hash:6>.json',
      }),
    )
  })
})
