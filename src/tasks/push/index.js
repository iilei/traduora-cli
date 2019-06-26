import getTerms from '../../modules/getTerms'

const push = async () => {
  const exclude = Object.keys(await getTerms())

  console.log(exclude)
}

export default push
