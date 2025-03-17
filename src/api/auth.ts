import { mockRequest } from "./index";

const users: Record<
  string,
  { username: string; email: string; password: string; refresh_token: string }
> = {};

export async function loginRequest(email: string, password: string) {
  const user = Object.values(users).find(
    (u) => u.email === email && u.password === password,
  );
  if (!user) throw new Error("Invalid credentials");

  return mockRequest({
    access_token: `mock_access_${Date.now()}`,
    refresh_token: user.refresh_token,
  });
}

export async function registerRequest(
  username: string,
  email: string,
  password: string,
) {
  if (users[email]) throw new Error("User already exists");

  users[email] = {
    username,
    email,
    password,
    refresh_token: `mock_refresh_${Date.now()}`,
  };

  return mockRequest({ success: true });
}

export async function refreshTokenRequest(refresh_token: string) {
  const user = Object.values(users).find(
    (u) => u.refresh_token === refresh_token,
  );
  if (!user) throw new Error("Invalid refresh token");

  return mockRequest({
    access_token: `mock_access_${Date.now()}`,
    refresh_token: `mock_refresh_${Date.now()}`,
  });
}
