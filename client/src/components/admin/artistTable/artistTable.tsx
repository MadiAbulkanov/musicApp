
import { Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import { useEffect } from 'react';
import { createPublishArtist, fetchArtists } from '../../../features/artists/artists.slice';
import { useAppDispatch, useAppSelector } from '../../../app/hook';

export function ArtistTable() {
  const dispatch = useAppDispatch();
  const { artists } = useAppSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const artistPublish = async (id: string) => {
    await dispatch(createPublishArtist(id));
    dispatch(fetchArtists());
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Artists</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing={4} justifyContent="center" marginTop="1px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {artists?.map((artist) => (
                <TableRow key={artist.id}>
                  <TableCell>{artist.id}</TableCell>
                  <TableCell>{artist.name}</TableCell>
                  <TableCell>{artist.description}</TableCell>
                  <TableCell>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        onClick={() => artistPublish(artist.id.toString())}
                      >
                        Publish
                      </Button>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}
