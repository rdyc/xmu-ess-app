import userManager from './userManager';

export default async function Api(
  method: string,
  url: string,
  path: string,
  data?: any
) {
  const user = await userManager.getUser();
  
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  // add acces token
  if (user !== null) {
    headers.append('Authorization',  `Bearer ${user.access_token}`);
  }

  return fetch(url + path, {
    method,
    headers,
    body: JSON.stringify(data)
  })
    .then(res => { 
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.statusText);
      }
    })
    .catch(err => { 
      throw new Error(err.statusText);
      // return Promise.reject();
    });
}
