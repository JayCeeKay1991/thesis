import { useState, useRef } from 'react';
import './UserDetails.css';
import { useMainContext } from '../Context/Context';
import { updateUser } from '../../services/UserClientService';
import { User } from '../../types/User';
import { postImageToCloudinary } from '../../services/CloudinaryService';
import { HiPlus } from 'react-icons/hi2';
import { GoPencil } from 'react-icons/go';
export type FormValuesUserProfile = {
  username: string;
  email: string;
  password: string;
  profilePic: string;
};
export default function UserDetails() {
  const { user, setUser } = useMainContext();
  const initialFormState = {
    username: user.userName,
    email: user.email,
    password: '',
    profilePic: user.profilePic,
  };
  const [formValuesProfile, setFormValuesProfile] =
    useState<FormValuesUserProfile>(initialFormState);
  const [changeUsername, setChangeUsername] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [changeProfilePic, setChangeProfilePic] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleEdit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const target = e.currentTarget.id;
    switch (target) {
      case 'username':
        setChangeUsername(!changeUsername);
        break;
      case 'email':
        setChangeEmail(!changeEmail);
        break;
      case 'password':
        setChangePassword(!changePassword);
        break;
      case 'profilePic':
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
        setChangeProfilePic(!changeProfilePic);
        break;
      default:
        break;
    }
  }

  async function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files?.length) {
      const file = files[0]; // Use the file directly from the input event
      try {
        const pictureUrl = await postImageToCloudinary({ file });
        console.log(pictureUrl);
        const newUser: Omit<User, 'password'> = {
          _id: user._id,
          userName: user.userName,
          email: user.email,
          profilePic: pictureUrl,
          channels: user.channels,
          mixTapes: user.mixTapes ? [...user.mixTapes] : [],
        };
        const updatedUser = await updateUser(newUser);
        if (updatedUser) {
          setUser(updatedUser);
          setChangeProfilePic(!changeProfilePic);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setFormValuesProfile({ ...formValuesProfile, [name]: value });
    }
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formValuesProfile.password !== user.password) {
      const newUser: User = {
        _id: user._id,
        userName: formValuesProfile.username,
        email: formValuesProfile.email,
        password: formValuesProfile.password,
        profilePic: user.profilePic,
        channels: user.channels,
        mixTapes: user.mixTapes ? [...user.mixTapes] : [],
      };
      const updatedUser = await updateUser(newUser);
      if (updatedUser) {
        setUser(updatedUser);
      }
    } else {
      const newUser: Omit<User, 'password'> = {
        _id: user._id,
        userName: formValuesProfile.username,
        email: formValuesProfile.email,
        profilePic: user.profilePic,
        channels: user.channels,
        mixTapes: user.mixTapes ? [...user.mixTapes] : [],
      };
      updateUser(newUser);
    }
    // console.log(e.currentTarget.id)
    switch (e.target) {
      case document.getElementById('usernameForm'):
        setChangeUsername(!changeUsername);
        break;
      case document.getElementById('emailForm'):
        setChangeEmail(!changeEmail);
        break;
      case document.getElementById('passwordForm'):
        setChangePassword(!changePassword);
        break;
      default:
        break;
    }
  }
  return (
      <div className='w-full h-screen flex justify-center items-center '>
    <div className="flex flex-col bg-tapeDarkBlack justify-center items-center w-[350px] h-[600px] rounded-[20px] border-[1px] ">
      <form
        id="profilePicForm"
        onSubmit={submitHandler}
        className="relative rounded-full justify-center  w-[180px] h-[180px]"
      >
        <div
          id="allProfilePic"
          className=" relative w-[180px] h-[180px] rounded-full flex justify-center items-center"
        >
          <div>
            <div
              className="relative overflow-hidden w-[180px] h-[180px] rounded-full flex items-center"
              id="profile-pic-mask"
            >
              <div>
                <input
                  name="profilePic"
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={changeHandler}
                />
              </div>
              <img
                src={user.profilePic}
                className="w-[180px] h-[200px] object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleEdit}
              id="profilePic"
              className="bg-gradient-to-t from-tapePink to-tapeYellow text-4xl absolute bottom-4 right-3 w-[40px] h-[40px] rounded-full"
            >
              <HiPlus />
            </button>
            <div className="bottom-1 right-1 w-[40px] h-[40px] rounded-full"></div>
          </div>
        </div>
      </form>
      <form data-testid="usernameForm" id="usernameForm" onSubmit={submitHandler}>
        <div id="allUsername">
          {changeUsername ? (
            <div>
              <input
                name="username"
                type="text"
                role='textbox'
                data-testid="username-input"
                className=" border border-tapeGray rounded-md bg-tapeBlack  text-tapeDarkGrey"
                onChange={changeHandler}
                value={formValuesProfile.username}
                required={true}
              />
              <div className='flex justify-end items-center'>
                <button
                  className="rounded-full h-5 w-10 flex  p-2 items-center ml-12 mr-5"
                  onClick={handleEdit}
                  id="username"
                  data-testid="edit-username-button"
                >
                  cancel
                </button>
                <button
                  className="rounded-full h-[20px] ml-[15px] flex p-2 items-center bg-tapeGray"
                  type="submit"
                  name='username'
                >
                  save
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleEdit}
              id="username"
              className="border-0 fontFamily-sans text-3xl"
              data-testid="edit-username-button"
            >
              <b>{user.userName}</b>
            </button>
          )}
        </div>
      </form>
      <div className="flex flex-row">
        <div className="flex flex-col p-2 justify-center items-center">
          <div>{user.mixTapes.length}</div>
          <div>Mixes</div>
        </div>
        <div className="flex flex-col p-2 justify-center items-center">
          <div>{user.channels.length}</div>
          <div>Channels</div>
        </div>
      </div>
      <div id="emailAndPassword" className="flex flex-col">
        <form id="emailForm" onSubmit={submitHandler}>
          <div id="allEmail" className="flex flex-col mb-10">
            <label className="block">
              <b>Email</b>
            </label>
            {changeEmail ? (
              <div className="flex flex-col mb-10">
                <input
                  name="email"
                  type="text"
                  className=" border border-tapeGray rounded-md bg-tapeBlack  text-tapeDarkGrey"
                  onChange={changeHandler}
                  data-testid="email-input"
                  value={formValuesProfile.email}
                  required={true}
                />
              <div className='flex justify-end items-center'>
                  <button
                  className="rounded-full h-5 w-10 flex  p-2 items-center ml-12 mr-5"
                  onClick={handleEdit}
                    id="email"
                  >
                    cancel
                  </button>
                  <button
                  className="rounded-full h-[20px] ml-[15px] flex p-2 items-center bg-tapeGray"
                  type="submit"
                  >
                    save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row space-x-10">
                <p>{user.email}</p>
                <button onClick={handleEdit} id="email" className="border-0"  data-testid="edit-email-button">
                  <GoPencil />
                </button>
              </div>
            )}
          </div>
        </form>
        <form id="passwordForm" onSubmit={submitHandler}>
          <div id="allPassword">
            <label className="block">
              <b>Password</b>
            </label>
            {changePassword ? (
              <div>
                <input
                  name="password"
                  type="password"
                  className=" border border-tapeGray rounded-md bg-tapeBlack  text-tapeDarkGrey"
                  onChange={changeHandler}
                  value={formValuesProfile.password}
                />
              <div className='flex justify-end items-center'>
                  <button
                    className="rounded-full h-5 w-10 flex  p-1 pb-2 items-center ml-12 mr-5"
                    onClick={handleEdit}
                    id="password"
                  >
                    cancel
                  </button>
                  <button
                  className="rounded-full h-[20px] ml-[15px] flex p-2 items-center bg-tapeGray"
                  type="submit"
                  >
                    save
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row justify-between">
                <h2 className="text-3xl">.........</h2>
                <button onClick={handleEdit} id="password" className="border-0">
                  <GoPencil />
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
