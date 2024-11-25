import { Typography, Grid, Container } from '@mui/material';
import { ArtistTable } from '../artistTable/artistTable';
import { AlbumTable } from '../albumTable/albumTable';
import { TrackTable } from '../trackTable/trackTable';

export function AdminPanel() {
  return (
    <Container>
      <Grid container direction="column" spacing={2}>
      <Grid item container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h5" sx={{ marginTop: "20px" }}>Admin panel</Typography>
        </Grid>
      </Grid>
      <Grid container item direction="column" spacing={4} marginTop= "1px">
        <Grid item xs={12} sm={6 } container justifyContent="center">
          <ArtistTable />
        </Grid>
        <Grid item xs={12} sm={6 } container justifyContent="center">
          <AlbumTable />
        </Grid>
        <Grid item xs={12} sm={6 } container justifyContent="center">
          <TrackTable />
        </Grid>
      </Grid>
    </Grid>
    </Container>
    
  );
}