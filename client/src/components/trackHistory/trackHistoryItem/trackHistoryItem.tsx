import { Typography, Grid, Card, Container } from '@mui/material';
import { TrackHistory } from '../../../interfaces/trackHistory.interface';

interface Props {
    item: TrackHistory
}

export function TrackHistiryItem({ item }: Props) {
  const { artistName, trackTitle, datatime } = item;

  const dateFormatting = new Date(datatime).toLocaleDateString();
  const timeFormatting = new Date(datatime).toLocaleTimeString();

  return (
    <Container>
     <Card sx={{ display: 'flex', justifyContent: "space-between", width: "100%", padding: 2, borde: "1px solid black" }}>
        <Grid item sx={{ display: 'flex'}}>
            <Typography gutterBottom variant="h5" component="div">{artistName} -</Typography>
            <Typography gutterBottom variant="h5" component="div">{trackTitle} </Typography>   
        </Grid>
        <Typography gutterBottom variant="h5" component="div">{dateFormatting} {timeFormatting}</Typography>
    </Card> 
    </Container>
    
  );
}