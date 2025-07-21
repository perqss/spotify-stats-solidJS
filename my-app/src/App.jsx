import BottomBar from "./components/BottomBar";
import CustomRoutes from "./components/CustomRoutes";
import PlaybackProvider from "./components/PlaybackProvider";

const App = () =>{
  return (
    <PlaybackProvider>
      <CustomRoutes/>
      <BottomBar/>
    </PlaybackProvider>
  );
}

export default App;
