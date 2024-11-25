import { Typography, Grid, Button, Container } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { ArtistItem } from './artistItem';
import { fetchPublishArtists } from '../../features/artists/artists.slice';
import { IUser } from '../../interfaces/user.interface';
import { Link } from 'react-router-dom';

export function Artists({ user }: { user: IUser | null }) {
  const dispatch = useAppDispatch();

  const { artists } = useAppSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchPublishArtists());
  }, [dispatch]);

  return (
    <Container>
      <Grid container direction="column" spacing={2} sx={{ marginTop: "10px" }}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">All artists</Typography>
        </Grid>
        {user && user.role === 'user' && (
        <Grid item>
          <Button color="primary" component={Link} to={'/artist/new'}>
            Add artist
          </Button> 
          <Button color="primary" component={Link} to={'/album/new'}>
            Add album
          </Button> 
          <Button color="primary" component={Link} to={'/track/new'}>
            Add track
          </Button> 
        </Grid>
        )}
        {user && user.role === 'admin' && (
        <Grid item>
          <Button color="primary" component={Link} to={'/admin-panel'}>
            Admin Panel
          </Button>  
        </Grid>
        )}
      </Grid>
      <Grid container item direction="row" spacing={4} marginTop= "1px" justifyContent="center">
        {artists?.map((artist) => (
          <Grid item display="flex" key={artist.id} justifyContent="center" flexDirection="row" flexWrap="wrap" maxWidth="350px" >
            <ArtistItem artist={artist} user={user}/>
          </Grid>
        ))}
      </Grid>
    </Grid>
    </Container>
  );
}