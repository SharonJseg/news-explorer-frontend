import { useState } from 'react';
import useInput from '../../hooks/use-input';
import './Form.css';

const isEmailValid = (value) => {
  let emailInput = /\S+@\S+\.\S+/;
  return emailInput.test(value);
};

const isNotEmpty = (value) => {
  let valueInput = /^[a-zA-Z0-9]{3,}$/;
  return valueInput.test(value);
};

const Form = (props) => {
  const {
    onClose,
    onHandleSubmitLogin,
    onHandleSubmitRegister,
    onRegisterFail,
    onLoginFail,
    onToggleForm,
  } = props;
  const [modalType, setModalType] = useState('signin');

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    handleValueChange: handleEmailChange,
    handleValueBlur: handleEmailBlur,
    reset: resetEmail,
  } = useInput(isEmailValid);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    handleValueChange: handlePasswordChange,
    handleValueBlur: handlePasswordBlur,
    reset: resetPassword,
  } = useInput(isNotEmpty);

  const {
    value: usernameValue,
    isValid: usernameIsValid,
    hasError: usernameHasError,
    handleValueChange: handleUserNameChange,
    handleValueBlur: handleUsernameBlur,
    reset: resetUserName,
  } = useInput(isNotEmpty);

  let isSigninFormValid = false;
  let isSignupFormValid = false;

  if (emailIsValid && passwordIsValid) {
    isSigninFormValid = true;
  }

  if (emailIsValid && passwordIsValid && usernameIsValid) {
    isSignupFormValid = true;
  }

  const resetForm = () => {
    resetEmail();
    resetPassword();
    resetUserName();
  };

  const handleSwitch = () => {
    if (modalType === 'signin') {
      setModalType('signup');
      resetForm();
    } else {
      setModalType('signin');
      resetForm();
    }
    onToggleForm();
  };

  const handleSubmitLogin = (evt) => {
    evt.preventDefault();
    if (!isSigninFormValid) {
      return;
    }
    onHandleSubmitLogin({ email: emailValue, password: passwordValue });
  };

  const handleSubmitRegister = (evt) => {
    evt.preventDefault();
    if (!isSignupFormValid) {
      return;
    }
    onHandleSubmitRegister({
      email: emailValue,
      password: passwordValue,
      name: usernameValue,
    });
    if (onRegisterFail) {
      setModalType('success');
    }
  };

  return (
    <>
      <button
        aria-label='close button'
        className='form__close-btn'
        onClick={onClose}
      />
      <h2
        className={`form__title ${
          modalType === 'success' ? 'form__title_response' : ''
        }`}
      >
        {modalType === 'success'
          ? 'Registration successfully completed!'
          : `Sign ${modalType === 'signin' ? 'in' : 'up'}`}
      </h2>
      {modalType !== 'success' && (
        <form
          className='form'
          noValidate
          onSubmit={
            modalType === 'signin' ? handleSubmitLogin : handleSubmitRegister
          }
        >
          <label htmlFor='email' className='form__label'>
            Email
          </label>
          <input
            required
            type='email'
            id='email'
            name='email'
            placeholder='Enter Email'
            value={emailValue}
            className='form__input'
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />

          <span
            className={`form__input-error ${
              emailHasError ? 'form__input-error_visible' : ''
            }`}
          >
            Please add a valid email
          </span>

          <label htmlFor='password' className='form__label'>
            Password
          </label>
          <input
            required
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
            value={passwordValue}
            className='form__input'
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <span
            className={`form__input-error ${
              passwordHasError ? 'form__input-error_visible' : ''
            }`}
          >
            Please add a valid password
          </span>
          {modalType !== 'signin' && (
            <>
              <label htmlFor='username' className='form__label'>
                Username
              </label>
              <input
                required
                type='text'
                id='username'
                name='username'
                placeholder='Enter your username'
                value={usernameValue}
                className='form__input'
                onChange={handleUserNameChange}
                onBlur={handleUsernameBlur}
              />
              <span
                className={`form__input-error ${
                  usernameHasError ? 'form__input-error_visible' : ''
                }`}
              >
                Please add a username
              </span>
            </>
          )}
          {onLoginFail && (
            <span className='form__submit-error'>
              The username or password are not correct
            </span>
          )}
          {onRegisterFail && (
            <span className='form__submit-error'>
              Something went wrong, please try again
            </span>
          )}

          {modalType === 'signin' ? (
            <button className='form__submit' disabled={!isSigninFormValid}>
              Sign in
            </button>
          ) : (
            <button className='form__submit' disabled={!isSignupFormValid}>
              Sign up
            </button>
          )}
        </form>
      )}
      {modalType !== 'success' ? (
        <p className='form__switch'>
          or{' '}
          <button onClick={handleSwitch} className='form__switch-button'>
            {`Sign ${modalType === 'signin' ? 'up' : 'in'}`}
          </button>
        </p>
      ) : (
        <button onClick={handleSwitch} className='form__switch-button'>
          Sign in
        </button>
      )}
    </>
  );
};

export default Form;
