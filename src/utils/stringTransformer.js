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

// assign(settings, ['Modules', 'Video', 'Plugin'], 'JWPlayer');
function createNestedObject(obj, keyPath, value) {
  let lastKeyIndex = keyPath.length - 1
  for (var i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i]
    if (!(key in obj)) obj[key] = {}
    obj = obj[key]
  }
  obj[keyPath[lastKeyIndex]] = value
}

export const deserialize = function(params) {
  let obj = {}

  let levelOneKeys = params.split('&')
  levelOneKeys.map(key => {
    let key1 = key.split('=')[0]
    let value = key.split('=')[1]

    let nestedKeyPath = key1.split('[')
    nestedKeyPath = nestedKeyPath.map(item => item.replace(']', ''))

    // If key has nested levels, set them up
    if (nestedKeyPath.length > 1) {
      createNestedObject(obj, nestedKeyPath, value)
    } else {
      // Doesnt have nested levels, just set the value
      obj[key1] = value
    }
  })

  return obj
}
