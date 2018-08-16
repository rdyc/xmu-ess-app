import configureStore from "../configureStore";
import { createHashHistory } from "history";

export default function Api(
  method: string,
  url: string,
  path: string,
  data?: any
) {
  const history = createHashHistory()
  const initialState = window.initialReduxState
  const user = configureStore(history, initialState).getState().oidc.user

  const headers = new Headers();

  headers.append('Accept',  'application/json')
  headers.append('Content-Type',  'application/json')

  // add acces token
  if(user !== undefined)
    headers.append('Authorization',  `Bearer ${user.access_token}`)

  return fetch(url + path, {
    method,
    headers,
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .catch(err => console.error(err));
}
