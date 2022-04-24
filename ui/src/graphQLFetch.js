/* eslint "no-alert": "off" */
export default function graphQLFetch(query, variables = {}) {
  return new Promise((resolve, reject) => {
    fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    })
      .then((res) => res.json())
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
}
