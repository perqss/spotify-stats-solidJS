import { createSignal, createContext } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Login from "./pages/Login";
// import TopArtists from "./pages/TopArtists";
// import TopSongs from "./pages/TopSongs";
// import RecentlyPlayed from "./pages/RecentlyPlayed";
// import BottomBar from "./components/BottomBar";
import Menu from "./components/Menu";
// import ArtistProfile from "./pages/ArtistProfile";
// import SongInfo from "./pages/SongInfo";
// import MusicTaste from "./pages/MusicTaste";
// import TopAlbums from "./pages/TopAlbums";
// import AlbumInfo from "./pages/AlbumInfo";

export const AppContext = createContext();

function App() {
  const [songId, setSongId] = createSignal();
  const [artistId, setArtistId] = createSignal();
  const [albumId, setAlbumId] = createSignal();
  const [openBottomBar, setOpenBottomBar] = createSignal(false);
  const [artistTerm, setArtistTerm] = createSignal("long_term");
  const [songTerm, setSongTerm] = createSignal("long_term");
  const [albumTerm, setAlbumTerm] = createSignal("long_term");

  const MenuWrapper = () => {
    return (
      <Menu
        componentIndex={0}
        setArtistTerm={setArtistTerm}
        term={artistTerm}
      />
    );
  }

  return (
    <Router>
      <AppContext.Provider
        value={{
          setSongId,
          setArtistId,
          setAlbumId,
          setOpenBottomBar,
        }}
      >
          <Route path="/" component={Login} />
          <Route 
            path='/top-artists' 
            component={MenuWrapper}
        />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
