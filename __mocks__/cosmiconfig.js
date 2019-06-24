const config = {
  'env-prefix': 'TR',
  'client-id': 'test',
  locale: 'en_GB',
  locales: ['de_DE', 'en_GB'],
}

const searchSync = jest.fn().mockImplementation(() => ({
  config,
  filepath: '/abs-path/foo/package.json',
}))

const cosmiconfigMock = jest.fn(() => ({
  searchSync,
}))

export default cosmiconfigMock

export { searchSync }
