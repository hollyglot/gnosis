const defaultContentType = 'application/json';

const apiURl = process.env.REACT_APP_API_URL;

const asyncRequest = async (payload) => {
  const {
    path,
    method,
    body,
    header,
  } = payload;

  const headers = { ...header };
  headers['Content-Type'] = `${ defaultContentType }`;

  const JSONbody = JSON.stringify(body);

  const response = await fetch(`${ apiURl }/${ path }`, {
    method,
    headers,
    body: body ? JSONbody : undefined,
  });

  if (response.status === 200) {
    const responseBody = response.json();
    return responseBody;
  }

  throw Error('An unexpected error has occured.');
};

export {
  asyncRequest
};
