const getFetchHeaders = () => ({
  'Content-Type': 'application/json',
  'x-auth-token': localStorage.token,
});

export default getFetchHeaders;
