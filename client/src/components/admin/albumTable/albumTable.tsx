
import { Typography, Grid, Button, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hook';
import { createPublishAlbum, fetchAlbums } from '../../../features/albums/albums.slice';

export function AlbumTable() {
  const dispatch = useAppDispatch();
  const { albums } = useAppSelector((state) => state.albums);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, [dispatch]);

  const albumPublish = async (id: string) => {
    await dispatch(createPublishAlbum(id));
    dispatch(fetchAlbums());
  }

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5">Albums</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="row" spacing={4} justifyContent="center" marginTop="1px">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Release</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {albums?.map((album) => (
                <TableRow key={album.id}>
                  <TableCell>{album.id}</TableCell>
                  <TableCell>{album.title}</TableCell>
                  <TableCell>{album.release}</TableCell>
                  <TableCell>
                    <Grid item>
                      <Button
                        variant="contained"
                        sx={{ padding: '5px 10px', margin: '5px' }}
                        onClick={() => albumPublish(album.id.toString())}
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
