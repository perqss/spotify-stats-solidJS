import { createSignal, createContext, useContext, createEffect } from "solid-js";
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
import FollowedArtists from "./pages/FollowedArtists";

export const AppContext = createContext();

function App() {
  const [songId, setSongId] = createSignal();
  const [artistId, setArtistId] = createSignal();
  const [albumId, setAlbumId] = createSignal();
  const [openBottomBar, setOpenBottomBar] = createSignal(false);
  const [artistTerm, setArtistTerm] = createSignal("long_term");
  const [songTerm, setSongTerm] = createSignal("long_term");
  const [albumTerm, setAlbumTerm] = createSignal("long_term");

  return (
    <AppContext.Provider
    value={{
      setSongId,
      setArtistId,
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
          component={() => 
              <>
                <Menu
                  componentIndex={0}
                  setTerm={setArtistTerm}
                />
                <TopArtists
                  artistTerm={artistTerm}
                />
              </>}
        />
        <Route 
          path='/artist/:artistId' 
          component={() =>
                <>
                  <Menu
                    setArtistTerm={setArtistTerm}
                    term={artistTerm}
                  />
                  <ArtistProfile/>
                </>}
        />
        <Route
          path='/top-songs'
          component={() => 
            <>      
              <Menu
                componentIndex={1}
                setSongTerm={setSongTerm}
              />
              <TopSongs 
                songTerm={songTerm}
              />
            </>}
        />
        <Route 
          path='/song/:songId' 
          component={() => 
              <>
                <Menu
                  setSongTerm={setSongTerm}
                  term={songTerm}
                />
                <SongInfo/>
            </>}
        />
        <Route
          path='/recently-played'
          component={() => 
            <>
              <Menu
              componentIndex={3}
            />
            <RecentlyPlayed/>
          </>}
        />
        <Route
          path='/top-albums'
          component={() => 
            <>         
              <Menu
                componentIndex={2}
                setAlbumTerm={setAlbumTerm}
                term={albumTerm}
              />
              <TopAlbums
                albumTerm={albumTerm}
              />
          </>}
        />
        <Route
          path='/album/:albumId'
          component={() => 
              <>
                <Menu
                  setAlbumTerm={setAlbumTerm}
                />
                <AlbumInfo/>
              </>}
        />
        <Route
          path='/followed-artists'
          component={() => 
            <>
              <Menu
                componentIndex={5}
              />
              <FollowedArtists/>
            </>}
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

// export const useAppContext = () => useContext(AppContext);
export default App;
