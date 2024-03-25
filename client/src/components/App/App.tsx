import { Outlet } from 'react-router-dom';
import AppNav from '../AppNav/AppNav';
import TestPlayer from '../TestPlayer/TestPlayer';
import ContextProvider, { useMainContext } from '@/components/Context/Context';

const App = () => {
  return (
    <ContextProvider>
      <div className="App bg-tapeBlack">
        <AppNav />
        {/* {user._id ? <TestPlayer /> : <></>} */}

        <TestPlayer />
        <Outlet />
      </div>
    </ContextProvider>
  );
};

export default App;
