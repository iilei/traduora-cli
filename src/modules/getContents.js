import fs from 'fs'
import { promisify } from 'util'
import aggregateResults from './aggregateResults'

const readFile = promisify(fs.readFile)

const getContents = async paths =>
  aggregateResults(
    await Promise.all(
      paths.map(path =>
        readFile(path, 'utf8').then(result => ({ path, terms: JSON.parse(result) })),
      ),
    ),
  )

export default getContents
