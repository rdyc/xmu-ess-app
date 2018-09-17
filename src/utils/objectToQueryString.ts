export function objectToQuerystring (obj: any) {
  if (obj === undefined) {
    return '';
  }
  
  return Object.keys(obj)
    .filter((key) => obj[key] !== undefined && obj[key] !== '')
    .reduce((str, key, i) => {
      let delimiter: string;
      let val: string;

      delimiter = (i === 0) ? '?' : '&';
      
      if (Array.isArray(obj[key])) {
        key = encodeURIComponent(key);

        const arrayVar = obj[key].reduce((strItem: any, item: any) => {
          val = encodeURIComponent(JSON.stringify(item));
          return [strItem, key, '=', val, '&'].join(''); 
        },                               '');
        
        return [str, delimiter, arrayVar.trimRightString('&')].join('');
      } else {
        key = encodeURIComponent(key);
        val = encodeURIComponent(JSON.stringify(obj[key]));
        
        return [str, delimiter, key, '=', val].join('');      
      }
    }, 
            '');
}