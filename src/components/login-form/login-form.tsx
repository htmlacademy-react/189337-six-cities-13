import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthData } from '../../types/api';
import { ToastPosition, toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-action';

const FORM_ERROR_TEXT = 'Missing login credentials. Please make sure to provide both your email and password to proceed.';
const TOAST_POSITION: ToastPosition = 'top-center';

export default function LoginForm() {
  const [authData, setAuthData] = useState<AuthData>({ login: '', password: '' });
  const { login, password } = authData;
  const dispatch = useAppDispatch();

  const validateForm = (): boolean => !!login && !!password;

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(loginAction(authData));
    } else {
      toast.error(FORM_ERROR_TEXT, { position: TOAST_POSITION });
    }
  };

  return (
    <form
      className="login__form form"
      onSubmit={handleLogin}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required={false}
          value={login}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setAuthData((prev) => ({ ...prev, login: value }));
          }}
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required={false}
          value={password}
          onChange={({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
            setAuthData((prev) => ({ ...prev, password: value }));
          }}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
      >
        Sign in
      </button>
    </form>
  );
}
