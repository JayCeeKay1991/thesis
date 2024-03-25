import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import TestPlayer from '../TestPlayer/TestPlayer';
import ContextProvider, { useMainContext } from '@/components/Context/Context';

const App = () => {
  const { isAuthenticated, user } = useMainContext();
  console.log(user);
  console.log(isAuthenticated);

  // delete
  // const userId = localStorage.getItem('loggedinUser');

  return (
    <ContextProvider>
      <div className="App bg-tapeBlack">
        <AppNav />
        {/* {user._id ? <TestPlayer /> : <></>} */}
        {/* {isAuthenticated ? <TestPlayer /> : <></>} */}
        <TestPlayer />
        <Outlet />
      </div>
    </ContextProvider>
  );
};

export default App;
