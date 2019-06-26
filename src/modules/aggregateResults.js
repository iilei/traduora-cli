const aggregateResults = results =>
  results.reduce((acc, { terms, path }) => {
    Object.keys(terms).forEach(term => {
      if (acc[term]) {
        throw new Error(`"${term}" redeclared at ${path}`)
      }
    })

    return { ...acc, ...terms }
  }, {})

export default aggregateResults
