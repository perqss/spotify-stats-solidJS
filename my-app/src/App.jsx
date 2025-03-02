import { createSignal, createContext, useContext } from "solid-js";
import { Router, Route } from "@solidjs/router";
import Login from "./pages/Login";
import TopArtists from "./pages/TopArtists";
import TopSongs from "./pages/TopSongs";
import Menu from "./components/Menu";
import ArtistProfile from "./pages/ArtistProfile";
import BottomBar from "./components/BottomBar";
import SongInfo from "./pages/SongInfo";
import RecentlyPlayed from "./pages/RecentlyPlayed";
// import MusicTaste from "./pages/MusicTaste";
import TopAlbums from "./pages/TopAlbums";
import AlbumInfo from "./pages/AlbumInfo";

const AppContext = createContext();

function App() {
  const [songId, setSongId] = createSignal();
  const [artistId, setArtistId] = createSignal();
  const [albumId, setAlbumId] = createSignal();
  const [openBottomBar, setOpenBottomBar] = createSignal(false);
  const [artistTerm, setArtistTerm] = createSignal("long_term");
  const [songTerm, setSongTerm] = createSignal("long_term");
  const [albumTerm, setAlbumTerm] = createSignal("long_term");

  const TopArtistsWrapper = () => 
      <div>
        <Menu
          componentIndex={0}
          setArtistTerm={setArtistTerm}
          term={artistTerm}
        />
        <TopArtists 
          artistTerm={artistTerm}
        />
      </div>

  const ArtistProfileWrapper = () => 
      <div>
        <Menu
          setArtistTerm={setArtistTerm}
          term={artistTerm}
        />
        <ArtistProfile/>
      </div>

  const TopSongsWrapper = () => 
    <div>
      <Menu
        componentIndex={1}
        setSongTerm={setSongTerm}
        term={songTerm}
      />
      <TopSongs 
        songTerm={songTerm}
      />
    </div>
  
  const SongInfoWrapper = () =>
    <div>
      <Menu
        setSongTerm={setSongTerm}
        term={songTerm}
      />
      <SongInfo/>
    </div>
  
  const RecentlyPlayedWrapper = () => 
    <div>
      <Menu
        componentIndex={3}
      />
      <RecentlyPlayed/>
    </div>
  
  const TopAlbumsWrapper = () => 
    <div>
      <Menu
        componentIndex={2}
        setAlbumTerm={setAlbumTerm}
        term={albumTerm}
      />
      <TopAlbums
        albumTerm={albumTerm}
      />
    </div>
  
  const AlbumInfoWrapper = () => 
    <div>
      <Menu
        setAlbumTerm={setAlbumTerm}
      />
      <AlbumInfo/>
    </div>

  return (
    <AppContext.Provider
    value={{
      setSongId,
      setArtistId,
      artistId,
      setAlbumId,
      setOpenBottomBar,
    }}
  >
    <div
    >
      <Router>
        <Route path="/" component={Login} />
        <Route 
          path='/top-artists' 
          component={TopArtistsWrapper}
        />
        <Route 
          path='/artist/:artistId' 
          component={ArtistProfileWrapper}
        />
        <Route
          path='/top-songs'
          component={TopSongsWrapper}
        />
        <Route 
          path='/song/:songId' 
          component={SongInfoWrapper}
        />
        <Route
          path='/recently-played'
          component={RecentlyPlayedWrapper}
        />
        <Route
          path='/top-albums'
          component={TopAlbumsWrapper}
        />
        <Route
          path='/album/:albumId'
          component={AlbumInfoWrapper}
        />
      </Router>
    <BottomBar 
        songId={songId} 
        artistId={artistId} 
        albumId={albumId} 
        open={openBottomBar} 
        setOpen={setOpenBottomBar}
      />
    </div>
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
export default App;
