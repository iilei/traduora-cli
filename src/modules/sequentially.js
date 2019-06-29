const sequentially = promises =>
  promises.reduce(
    (acc, cur) =>
      acc.then(results => {
        return cur().then(result => [...results, result])
      }),
    Promise.resolve([]),
  )

export default sequentially
