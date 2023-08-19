import { ChangeEvent, FormEvent, useState } from 'react';
import { AuthData } from '../../types/api';
import { ToastPosition, toast } from 'react-toastify';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-action';
import { GLOBAL_TOAST_ID } from '../../const';

const FORM_ERROR_TEXT = 'Your password was entered incorrectly, it must contain 1 uppercase letter and 1 digit.Thank you for using our service.';
const TOAST_POSITION: ToastPosition = 'top-center';

function LoginForm() {
  const [authData, setAuthData] = useState<AuthData>({ login: '', password: '' });
  const [isEnabled, setEnabled] = useState<boolean>(false);
  const { login, password } = authData;
  const dispatch = useAppDispatch();

  const validateForm = (): boolean => /^(?=.*[A-Z])(?=.*\d).*$/.test(password);

  const checkEnabled = (data: AuthData) => {
    setEnabled(!!data.login.length && !!data.password.length);
  };

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm()) {
      dispatch(loginAction(authData));
    } else {
      toast.error(FORM_ERROR_TEXT, { position: TOAST_POSITION, toastId: GLOBAL_TOAST_ID });
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
            checkEnabled({ login: value, password });
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
            checkEnabled({ login, password: value });
          }}
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!isEnabled}
      >
        Sign in
      </button>
    </form>
  );
}

export default LoginForm;
