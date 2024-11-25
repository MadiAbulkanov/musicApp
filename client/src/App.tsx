import { Container, CssBaseline } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import AppToolbar from "./components/UI/AppToolbar/AppToolbar"
import { Artists } from "./containers/artists/artists"
import { ArtistAlbums } from "./components/artistAlbums/artistAlbums"
import { AlbumTracks } from "./components/albumTracks/albumTracks"
import { useAppSelector } from "./app/hook"
import { Register } from "./containers/register/register"
import { Login } from "./containers/login/login"
import { TrackHistiry } from "./components/trackHistory/trackHistory"
import FormAddArtist from "./components/formAddArtist/formAddArtist"
import FormAddAlbum from "./components/formAddAlbum/formAddAlbum"
import FormAddTrack from "./components/formAddTrack/formAddTrack"
import { AdminPanel } from "./components/admin/adminPanel/adminPanel"

function App() {
  const user = useAppSelector((state) => state.user.user);

  return (
    <>
       <CssBaseline />
      <header>
        <AppToolbar user={user} />
      </header>
      <main>
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Artists user={user}/>} />
            <Route path="artist/:id/albums" element={<ArtistAlbums user={user}/>} />
            <Route path="album/:id/tracks" element={<AlbumTracks user={user}/>} />
            <Route path="artist/new" element={<FormAddArtist />} />
            <Route path="album/new" element={<FormAddAlbum />} />
            <Route path="track/new" element={<FormAddTrack />} />
            <Route path="auth/sign-up" element={<Register />} />
            <Route path="auth/sign-in" element={<Login />} />
            <Route path="track-history" element={<TrackHistiry />} />
            <Route path="admin-panel" element={<AdminPanel />} />
          </Routes>
        </Container>
      </main>
    </>
  )
}

export default App
