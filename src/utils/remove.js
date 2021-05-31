import _ from 'lodash'

export const removeEmpty = (obj) => {
  return _.transform(obj, function (result, value, key) {
    if (!_.isEmpty(value) || _.isBoolean(value)) {
      if (typeof value === 'object') {
        result[key] = removeEmpty(value)
      } else {
        result[key] = value
      }
    } else if (_.isArray(value)) {
      result[key] = []
    }
  })
}
