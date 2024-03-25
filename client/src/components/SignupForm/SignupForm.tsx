import { useState } from 'react';
import { useMainContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/services/UserClientService';
import './SignupForm.css';
import auth from '@/utils/auth';

export type FormValuesUser = {
  userName: string;
  email: string;
  password: string;
};

const initialStateUser = {
  userName: '',
  email: '',
  password: '',
};

const SignupForm = () => {
  const { user, setUser, setIsAuthenticated } = useMainContext();

  const navigate = useNavigate();
  const [formValuesUser, setFormValuesUser] =
    useState<FormValuesUser>(initialStateUser);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormValuesUser({ ...formValuesUser, [name]: value });
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { userName, email, password } = formValuesUser;
    const signupData = {
      userName,
      email,
      password,
    };

    // make service call signup function
    const newUser = await signup(signupData);

    // set user to the signed up user
    newUser && setUser(newUser);

    setFormValuesUser(initialStateUser);

    // set the localstorage to the new user id
    if (newUser) {
      setIsAuthenticated(true);
      localStorage.setItem('loggedinUser', newUser._id);
      localStorage.setItem('isAuthenticated', 'true');

      // Call setIsAuthenticated with true to update authentication state
      auth.login(() => navigate('/dash'));
    }

    // SET navigation to Dashboard
    // navigate('/dash');
  };

  // do we need conditional below?
  return (
    <form onSubmit={handleSignup} className="flex flex-col w-[400px] pb-[50px]">
      <input
        name="userName"
        value={formValuesUser.userName}
        type="text"
        placeholder="username"
        onChange={changeHandler}
        required={true}
        className="h-[90px] mb-[20px] p-[30px]  border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-medium outline-none"
        data-testid="input-name"
      />
      <input
        name="email"
        value={formValuesUser.email}
        type="text"
        placeholder="email"
        onChange={changeHandler}
        required={true}
        className="h-[90px] mb-[20px] p-[30px]  border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-medium outline-none"
      />
      <input
        name="password"
        value={formValuesUser.password}
        type="password"
        placeholder="password"
        onChange={changeHandler}
        required={true}
        className="h-[90px] mb-[50px] p-[30px]  border-tapeDarkGrey bg-tapeBlack border-[2px] text-[25px] text-tapeWhite font-medium outline-none"
      />
      <button
        className="signup-button h-[90px] bg-tapeYellow border-none rounded-[10px] text-[30px] font-semibold"
        type="submit"
        data-testid="signup-button"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
