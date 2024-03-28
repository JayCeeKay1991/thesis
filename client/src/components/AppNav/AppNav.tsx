import { Link, useNavigate } from 'react-router-dom';
import { useMainContext, initialStateUser } from '@/components/Context/Context';
import { MdHome } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '@/services/UserClientService';
import { usePlayerContext } from '../Context/PlayerContext';

const AppNav = () => {
  const { user, setUser } = useMainContext();
  const {setCurrentStream, currentStream, streamIndex} = usePlayerContext();


  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(initialStateUser);
      if (currentStream[streamIndex]) {
        currentStream[streamIndex].stop()
      }
      setCurrentStream([]);
      navigate('/home');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <nav className=" flex flex-row items-center">
        <button
          className="bg-none text-tapeWhite border-[1px] border-tapeWhite flex flex-row justify-center items-center rounded-full mr-[15px] w-[45px] h-[45px] hover:bg-tapeWhite hover:text-tapeDarkBlack "
          onClick={handleLogout}
          data-testid="logout-button"
        >
          <FiLogOut size={22} />
        </button>

        <Link to={"/user"}>
          <div className="overflow-hidden rounded-full w-[50px] h-[50px] flex justify-center items-center">
            <img
              src={user.profilePic}
              className="w-16 h-16 object-cover"
              style={{ objectPosition: "center-center" }}
              data-testid="profile-image"
            />
          </div>
        </Link>

    </nav>
  );
};

export default AppNav;
