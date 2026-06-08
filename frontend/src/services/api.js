const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

let csrfToken = "";

async function ensureCsrf() {
  if (csrfToken) return csrfToken;
  const response = await fetch(`${API_URL}/csrf-token`, { credentials: "include" });
  const data = await response.json();
  csrfToken = data.csrfToken;
  return csrfToken;
}

async function request(path, options = {}) {
  const isWrite = !["GET", undefined].includes(options.method);
  const headers = { ...(options.headers || {}) };
  const token = localStorage.getItem("token");

  if (token) headers.Authorization = `Bearer ${token}`;
  if (isWrite) headers["CSRF-Token"] = await ensureCsrf();
  if (options.body && !(options.body instanceof FormData)) headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers,
    body: options.body && !(options.body instanceof FormData) ? JSON.stringify(options.body) : options.body
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "Request failed");
  if (data.token) localStorage.setItem("token", data.token);
  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body }),
  put: (path, body) => request(path, { method: "PUT", body }),
  patch: (path, body) => request(path, { method: "PATCH", body })
};
