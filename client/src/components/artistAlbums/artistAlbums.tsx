import { useLocation } from 'react-router-dom';
import { Typography, Grid, Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchPublishArtistAlbums } from '../../features/albums/albums.slice';
import { AlbumItem } from './albumItems/albumItems';
import { IUser } from '../../interfaces/user.interface';
import './artistAlbums.css';

export function ArtistAlbums({ user }: { user: IUser | null }) {
  const location = useLocation();
  const { artist } = location.state;
  const dispatch = useAppDispatch();

  const { albums } = useAppSelector((state) => state.albums);

  useEffect(() => {
      dispatch(fetchPublishArtistAlbums(artist.id));
  }, [dispatch]);

  return (
    <Container>
     <Box>
      <div className="artist-info">
       <Typography sx={{ fontSize: "40px", margin: "15px", color: "#0c78bf" }}>
        Name: {artist.name}
      </Typography>
      <Typography sx={{ fontSize: "40px", margin: "15px", color: "#0c78bf" }}>
        Description: {artist.description}
      </Typography> 
      </div>
      <Grid container item direction="column" spacing={2} marginTop= "1px">
        {albums?.map((album) => (
          <Grid item xs={12} sm={6}  key={artist.id} >
            <AlbumItem album={album} artist={artist} user={user}/>
          </Grid>
        ))}
      </Grid>
    </Box> 
    </Container>
    
  );
}