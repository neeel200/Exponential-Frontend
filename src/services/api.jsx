const BASE_URL = 'http://localhost:5000';

export const getUserData = async (userId) => {
  const response = await fetch(`${BASE_URL}/user/${userId}`);
  return response.json();
};

export const clickButton = async (userId) => {
  const response = await fetch(`${BASE_URL}/click`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return response.json();
};
