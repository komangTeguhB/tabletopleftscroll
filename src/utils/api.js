import { convertParamsToURLString } from "./string";

const API_URL = process.env.REACT_APP_API_ENDPOINT;
const URL_REGEX =
  /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

async function request(path) {
  let newURL;
  const checkURL = path.match(URL_REGEX);

  if (checkURL) {
    [newURL] = checkURL;
  } else {
    newURL = `${API_URL}${path}`;
  }

  try {
    const response = await fetch(newURL);

    if (!response.ok) {
      await response.text().then((text) => {
        throw Error(text);
      });
    }

    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function getUsers(page, limit) {
  const newURL = convertParamsToURLString("/users", { page });

  return await request(newURL);
}

export async function getUserDetails(id) {
  return await request(`/users/${id}`);
}
