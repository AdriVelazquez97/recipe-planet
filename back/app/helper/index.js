const _ = require('lodash')

function createQuerySearch(searchParams) {
  if (_.isEmpty(searchParams)) {
    return {}
  }

  const querySearch = searchParams.map(param => {
    const values = param.value.map(matchValue => {
      return {
        [param.type]: matchValue
      }
    });

    return {
      $and: [{
        $or: values
      }]
    };
  })

  return {
    $and: querySearch
  }
}

module.exports = {
  createQuerySearch,
}