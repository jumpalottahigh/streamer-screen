// https://stackoverflow.com/questions/1714786/query-string-encoding-of-a-javascript-object

export const serialize = function(obj, prefix) {
  let str = [],
    p
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      let k = prefix ? prefix + '[' + p + ']' : p,
        v = obj[p]
      str.push(
        v !== null && typeof v === 'object'
          ? serialize(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      )
    }
  }
  return str.join('&')
}

// TODO:
export const deserialize = function(params) {
  console.log(params)
  let obj = {}

  let levelOneKeys = params.split('&')
  levelOneKeys.map(key => {
    let key1 = key.split('=')[0]
    let value = key.split('=')[1]

    // If key has nested levels, set them up
    if (key1.includes('[')) {
      console.log('Has sub levels')
      let subLevels = key1.split('[')

      // TODO:
      // recursion ?
      subLevels.map((subKey, index) => {
        if (index != subLevels.length - 1) {
          obj[subKey] = {}
        } else {
          obj[subKey] = value
        }
      })

      console.log(subLevels.length)
      console.log(subLevels)
    } else {
      // Doesnt have nested levels, just set the value
      obj[key1] = value
    }
  })

  return obj
}
