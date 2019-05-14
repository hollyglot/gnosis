const defaultContentType = 'application/json';

const apiURl = process.env.REACT_APP_API_URL;

const asyncRequest = async (payload) => {
  const {
    path,
    method,
  } = payload;

  const headers = {
    'Content-Type': `${ defaultContentType }`
  };

  const response = await fetch(`${ apiURl }/${ path }`, {
    method,
    headers
  });

  if (response.status === 200) {
    const responseBody = response.json();
    return responseBody;
  }

  throw Error('An unexpected error has occurred.');
};

export {
  asyncRequest
};
