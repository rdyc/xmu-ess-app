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
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response;
    }
  })
  .catch(error => error);
}
