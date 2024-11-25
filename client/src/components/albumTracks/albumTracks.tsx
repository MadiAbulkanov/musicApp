import { useLocation } from 'react-router-dom';
import { Typography, Grid, Box, Container } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { TrackItem } from './trackItem/trackItem';
import { IUser } from '../../interfaces/user.interface';
import { fetchPublishAlbumTracks } from '../../features/tracks/tracks.slice';

export function AlbumTracks({ user }: { user: IUser | null }) {
  const location = useLocation();
  const { artist, album } = location.state;
  const dispatch = useAppDispatch();

  const { tracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
      dispatch(fetchPublishAlbumTracks(album.id));
  }, [dispatch]);

  return (
    <Container>
     <Box>
      <Typography sx={{ fontSize: "30px", margin: "25px", }}>
        {album.title}
      </Typography>
      <Grid container item direction="row" spacing={2} marginTop= "1px">
        {tracks?.map((track, index) => (
          <Grid item xs={12} key={track.id} container>
            <TrackItem track={track} artistName={artist.name} index={index} user={user}/>
          </Grid>
        ))}
      </Grid>
    </Box> 
    </Container>
  );
}