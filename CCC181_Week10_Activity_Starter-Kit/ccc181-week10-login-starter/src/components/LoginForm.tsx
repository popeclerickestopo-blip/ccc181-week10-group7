
import { useEffect, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

const API_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

interface User {
  id: number;
  name: string;
  email: string;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember: boolean;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

const INITIAL_VALUES: LoginFormValues = {
  email: '',
  password: '',
  remember: false,
};

export default function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Restore an existing login session
  useEffect(() => {
    async function restoreSession() {
      const token = sessionStorage.getItem('campusconnect_token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          sessionStorage.removeItem('campusconnect_token');
          setLoading(false);
          return;
        }

        const currentUser: User = await response.json();
        setUser(currentUser);
      } catch {
        sessionStorage.removeItem('campusconnect_token');
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, type, value, checked } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function validate(): LoginErrors {
    const nextErrors: LoginErrors = {};

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.';
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate();
    setErrors(nextErrors);
    setMessage('');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.error === 'Invalid email or password.'
            ? 'Wrong email or password.'
            : data.error || 'Unable to sign in. Please try again.'
        );
        return;
      }

      sessionStorage.setItem('campusconnect_token', data.token);
      setUser(data.user);
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch {
      setMessage(
        'Cannot connect to the server. Please check if the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('campusconnect_token');
    setUser(null);
    setValues(INITIAL_VALUES);
    setErrors({});
    setMessage('');
  }

  if (loading) {
    return (
      <section className="login-card">
        <p role="status">Loading...</p>
      </section>
    );
  }

  // Welcome screen after successful login
  if (user) {
    return (
      <section className="login-card" aria-labelledby="login-title">
        <h2 id="login-title" className="login-card__title">
          Welcome!
        </h2>

        <p className="login-card__subtitle">
          You are successfully signed in.
        </p>

        <div className="form-success" role="status">
          <p>Hello, {user.name}!</p>
          <p>{user.email}</p>
        </div>

        <button
          type="button"
          className="btn btn--primary"
          onClick={handleLogout}
        >
          Sign out
        </button>
      </section>
    );
  }

  return (
    <section className="login-card" aria-labelledby="login-title">
      <h2 id="login-title" className="login-card__title">
        Sign in
      </h2>

      <p className="login-card__subtitle">
        Use your school email to continue.
      </p>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="email">School email</label>

          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="name@school.edu.ph"
            value={values.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />

          {errors.email && (
            <p id="email-error" className="form-error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>

          <div className="password-row">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'password-error' : undefined
              }
            />

            <button
              type="button"
              className="btn btn--ghost toggle-password"
              aria-controls="password"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((current) => !current)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          {errors.password && (
            <p id="password-error" className="form-error" role="alert">
              {errors.password}
            </p>
          )}
        </div>

        <div className="form-options">
          <label className="checkbox">
            <input
              type="checkbox"
              name="remember"
              checked={values.remember}
              onChange={handleChange}
            />
            <span>Keep me signed in</span>
          </label>

          <a className="link" href="#forgot">
            Forgot password?
          </a>
        </div>

        {message && (
          <p className="form-error" role="alert">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="btn btn--primary"
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="login-card__divider">
        <span>or</span>
      </div>

      <div className="alt-actions">
        <button type="button" className="btn btn--secondary">
          Create account
        </button>

        <button type="button" className="btn btn--secondary">
          Continue as guest
        </button>
      </div>
    </section>
  );
}
