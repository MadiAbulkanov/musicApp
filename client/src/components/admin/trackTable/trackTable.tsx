import { Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { createPublishTrack, fetchTracks } from '../../../features/tracks/tracks.slice';

export function TrackTable() {
  const dispatch = useAppDispatch();
  const { tracks } = useAppSelector((state) => state.tracks);

  useEffect(() => {
    dispatch(fetchTracks());
  }, [dispatch]);

  const trackPublish = async (id: string) => {
    await dispatch(createPublishTrack(id));
    dispatch(fetchTracks());
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Tracks</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing={4} justifyContent="center" marginTop="1px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks?.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>{track.id}</TableCell>
                  <TableCell>{track.title}</TableCell>
                  <TableCell>{track.duration}</TableCell>
                  <TableCell>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        onClick={() => trackPublish(track.id.toString())}
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