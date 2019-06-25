import getExports from '../../modules/getExports'

const pull = async () => {
  const exports = await getExports()

  console.log(JSON.stringify(exports, null, 2))
}

export default pull
