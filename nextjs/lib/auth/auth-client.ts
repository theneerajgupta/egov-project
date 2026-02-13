export interface LoginResponse {
  user: {
    id: number;
    display_name: string;
    email: string;
    phone: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    user_type_code: string;
    user_type_name: string;
  };
  login_logged_at: number;
}

export async function Login(email: string, password: string) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? 'Login Failed');
  }
  return data as LoginResponse;
}
