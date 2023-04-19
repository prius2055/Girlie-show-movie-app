export const involvementUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';

// INVOLEMENT API
export const fetchInvolvementAPI = async () => {
  const response = await fetch(`${involvementUrl}apps`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const appId = await response.text();
  return appId;
};
