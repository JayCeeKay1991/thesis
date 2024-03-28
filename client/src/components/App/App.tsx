import { Outlet } from 'react-router-dom';
import PlayerContextProvider from '../Context/PlayerContext'; // Renamed import

const App = () => {
  return (
    <PlayerContextProvider>
      <div className="App">
        {/* <Player /> */}
        <Outlet />
      </div>
    </PlayerContextProvider>
  );
};

export default App;
