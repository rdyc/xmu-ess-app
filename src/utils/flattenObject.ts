export const flattenObject = (ob: any) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) { continue; }
    
    if ((typeof ob[i]) === 'object') {
      const flatObject = flattenObject(ob[i]);

      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) { continue; }
        
        toReturn[i] = flatObject[i] ? `${flatObject[i]}, ${flatObject[x]}` : flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};