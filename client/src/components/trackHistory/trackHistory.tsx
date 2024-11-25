import { Typography, Grid, Box } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchTrackHistory } from '../../features/trackHistory/trackHistory.slice';
import { TrackHistiryItem } from './trackHistoryItem/trackHistoryItem';

export function TrackHistiry() {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const tracksHistory = useAppSelector((state) => state.trackHistory.tracksHistory)

  useEffect(() => {
    if(user && user.token) {
        dispatch(fetchTrackHistory(user?.token));
    }
  }, []);

  return (
    <Box>
      <Typography sx={{ fontSize: "40px", margin: "25px", textAlign: "center", color: "#0c78bf" }}>
        Track History
      </Typography>
      <Grid container item direction="row" spacing={2} marginTop= "1px">
        {tracksHistory?.map((trackHistory) => (
          <Grid item xs={12} key={trackHistory.id} container>
            <TrackHistiryItem item={trackHistory}/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}