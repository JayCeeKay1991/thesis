import { useState } from 'react';
import { useMainContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';
import { signup } from '@/services/UserClientService';

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
  const { setUser } = useMainContext();

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

    // SET navigation to Dashboard
    if (newUser) {
      setUser(newUser);
      navigate('/dash');
    }

    setFormValuesUser(initialStateUser);
  };

  // do we need conditional below?
  return (
    <form
      onSubmit={handleSignup}
      className="flex flex-col w-full pb-[50px] pl-[40px] pr-[40px]"
    >
      <input
        name="userName"
        value={formValuesUser.userName}
        type="text"
        placeholder="Username"
        onChange={changeHandler}
        required={true}
        className="h-[70px] mb-[20px] p-[30px]  border-tapeDarkGrey bg-tapeDarkBlack border-[1px] text-[17px] text-tapeWhite font-medium outline-none"
        data-testid="input-name"
      />
      <input
        name="email"
        value={formValuesUser.email}
        type="text"
        placeholder="Email"
        onChange={changeHandler}
        required={true}
        className="h-[70px] mb-[20px] p-[30px]  border-tapeDarkGrey bg-tapeDarkBlack border-[1px] text-[17px] text-tapeWhite font-medium outline-none"
      />
      <input
        name="password"
        value={formValuesUser.password}
        type="password"
        placeholder="Password"
        onChange={changeHandler}
        required={true}
        className="h-[70px] mb-[30px] p-[30px]  border-tapeDarkGrey bg-tapeDarkBlack border-[1px] text-[17px] text-tapeWhite font-medium outline-none"
      />
      <button
        className="signup-button h-[90px] text-tapeDarkBlack bg-tapeWhite rounded-[10px] text-[19px] font-semibold hover:bg-tapeDarkBlack hover:text-tapeWhite hover:border-[1px] hover:border-tapeWhite"
        type="submit"
        data-testid="signup-button"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
