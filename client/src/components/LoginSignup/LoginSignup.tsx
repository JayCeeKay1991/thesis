import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import SignupForm from "../SignupForm/SignupForm";

type propsType = {
  formValue: string;
  toggleShowLogin: () => void;
};


export function LoginSignup({ formValue, toggleShowLogin }: propsType) {

    const [formState, setFormState] = useState('');

    useEffect(() => {
        if (formValue !== "login") {
            setFormState("signUp")
        } else {
            setFormState("login");
        }
    },[])

  return (
    <div
      id="loginBackground"
      className="w-full h-full bg-tapeBlack/90 fixed z-50 top-0 left-0 flex flex-row justify-center items-center "
    >
      <div
        id="loginSignup"
        className="w-[540px] h-[800px] rounded-[20px] bg-tapeBlack flex flex-col items-center justify-between border-tapeDarkGrey border-[2px]"
      >
        <div id="buttonWrap" className="w-full">
          <button
            onClick={toggleShowLogin}
            className=" text-tapeDarkGrey text-[50px] border-none ml-[50px]"
          >
            x
          </button>
        </div>

        {formState === "login" ? (
          <>
            <p data-testid="login-header" className="text-[70px] text-tapeWhite w-full font-semibold text-center mb-[30px]">
              Welcome back
            </p>
            <div className="w-[180px] flex flex-row justify-between text-[27px] font-medium text-tapeDarkGrey mb-[40px]">
              <a className="text-tapeWhite cursor-pointer" onClick={()=> setFormState('login')}>Login</a>
              <a className="text-tapeDarkGrey hover:text-tapeWhite cursor-pointer" onClick={()=> setFormState('signUp')}>Sign up</a>
            </div>
            <LoginForm />
          </>
        ) : (
          <>
            <p data-testid="signup-header" className="text-[60px] text-tapeWhite w-full font-semibold text-center mb-[30px]">
              Sign up
            </p>
            <div className="w-[180px] flex flex-row justify-between text-[27px] font-medium text-tapeWhite mb-[40px]">
              <a onClick={()=> setFormState('login')} className="text-tapeDarkGrey hover:text-tapeWhite cursor-pointer">Login</a>
              <a onClick={()=> setFormState('signUp')} className="text-tapeWhite cursor-pointer">Sign up</a>
            </div>
            <SignupForm />
          </>
        )}
      </div>
    </div>
  );
}

export default LoginSignup;