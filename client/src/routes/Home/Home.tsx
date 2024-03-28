import { useState } from 'react';
import Nav from '@/components/Nav/Nav';
import hero from '@/assets/svg/hero-bg.svg';
import logo from '@/assets/svg/logo.svg';
import keyImage from '@/assets/svg/key-image.svg';
import bigVis from '@/assets/svg/big-vis.svg';
import img1 from '@/assets/img/pexels-anastasia-shuraeva-5704849.jpg';
import img2 from '@/assets/img/pexels-juan-gomez-2589650.jpg';
import img3 from '@/assets/img/pexels-sindre-fs-1040880.jpg';
import img4 from '@/assets/img/pexels-vazhnik-7562313.jpg';
import './Home.css';
import LoginSignup from '@/components/LoginSignup/LoginSignup';

const Home = () => {
  const [loginVisible, setLoginVisible] = useState(false);
  const [formValue, setFormValue] = useState('login');

  // Toggles the visibilty of the login/signup form
  function toggleShowLogin() {
      setLoginVisible(!loginVisible);
  }

  return (
    <>
      <Nav toggleShowLogin={toggleShowLogin} setFormValue={setFormValue} />

      {loginVisible && (
        <LoginSignup formValue={formValue} toggleShowLogin={toggleShowLogin} />
      )}

      <div id="wrapper" className="w-full h-full flex flex-col top-0">
        <section
          id="feature0"
          className="w-full h-screen flex flex-col justify-center top-0 "
        >
          <div id="cta" className="w-[750px] z-10 ml-[50px] mt-[50px]">
            <h1 className="text-[80px] leading-[90px] mb-[40px] text-tapeWhite font-semibold ">
              Make mixtape streams with your friends
            </h1>
            <p className="w-[470px] mb-[30px] font-regular text-[17px] leading-[20px]  text-tapeWhite">
              Tape FM lets you upload mixes and <br></br>share them in groups of
              your friends
            </p>
            <button
              onClick={() => {
                setFormValue("signUp");
                toggleShowLogin();
              }}
              className="w-[150px] h-[60px] text-[20px] font-medium rounded-full bg-tapeWhite text-tapeBlack border-none hover:bg-tapeDarkBlack hover:bg-tapeWhite"
            >
              Join now
            </button>
          </div>
        </section>

        <section
          id="feature1"
          name="channels"
          className="w-full h-screen bg-tapeDarkBlack flex flex-row justify-center relative"
        >
          <div
            id="feature-body1"
            className="w-full h-full flex flex-col align-middle p-[40px] text-center "
          >
            <div className="mt-[100px] h-1/2  flex flex-col justify-between">
              <h3 className="text-[15px] font-medium mt-[10px] text-tapeWhite">
                Tape channels
              </h3>
              <h1 className="text-[80px] font-medium leading-[90px] text-tapeWhite">
                Create channels <br></br>and share music
              </h1>
            </div>
            <div id="img-crop1" className="">
              <img src={img1} id="img1" className="absolute "></img>
            </div>
            <div id="img-crop2" className="">
              <img src={img2} id="img2" className="absolute "></img>
            </div>
          </div>
        </section>

        <section
          id="feature2"
          name="interact"
          className="h-screen w-full bg-tapeWhite flex flex-col text-center justify-between relative"
        >
          <h3 className="text-[20px] text-tapeBlack font-medium mt-[20px]">
            How it works
          </h3>
          <div id="img-crop11" className="">
            <img src={img3} id="img11" className="absolute "></img>
          </div>
          <div id="img-crop22" className="">
            <img src={img4} id="img22" className="absolute "></img>
          </div>
          <img src={keyImage} id="key-image"></img>
          <h2 className="text-[30px] mb-[40px] font-medium text-tapeBlack">
            You can add a mixtape to the stream and playback
          </h2>
        </section>

        <section
          id="feature3"
          className="h-screen w-full bg-gradient-to-t from-tapePink to-tapeYellow  flex flex-col justify-center relative"
        >
          <div id="text-wrapper">
            <div className="w-full h-[160px] text-[150px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[50px]">
                <span className="text-tapeWhite">Sharing music </span>
                <span>Making mixtapes </span>
                <span className="text-tapeWhite">Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[150px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[50px]">
                <span>Sharing music </span>
                <span className="text-tapeWhite">Making mixtapes </span>
                <span>Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[150px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[50px]">
                <span className="text-tapeWhite">Sharing music </span>
                <span>Making mixtapes </span>
                <span className="text-tapeWhite">Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px] text-[150px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[50px]">
                <span>Sharing music </span>
                <span className="text-tapeWhite">Making mixtapes </span>
                <span>Playing tunes </span>
              </p>
            </div>
            <div className="w-full h-[160px]  text-[150px] overflow-hidden relative">
              <p className="font-semibold whitespace-nowrap absolute -top-[50px]">
                <span className="text-tapeWhite">Sharing music </span>
                <span>Making mixtapes </span>
                <span className="text-tapeWhite">Playing tunes </span>
              </p>
            </div>
          </div>
        </section>

        <section
          id="feature4"
          className="w-full h-screen bg-tapeDarkBlack flex flex-col justify-between"
        >
          <img id="big-vis" className="w-full" src={bigVis}></img>

          <div
            id="footer"
            className="flex flex-row justify-between pr-[50px] pl-[50px] mb-[40px]"
          >
            <img id="logo" className="w-[150px]" src={logo}></img>
            <p className="text-tapeWhite w-[700px] flex flex-row justify-between text-[15px]">
              <span> © 2024 Tape</span>
              <span> Privacy Policy</span>
              <span> Terms & Conditions</span>
              <span>Legal</span>
            </p>
            <p className="text-tapeWhite  text-[15px]">Contact us</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
