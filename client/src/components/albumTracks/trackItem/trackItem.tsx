import {
  Card,
  IconButton,
  Typography,
} from '@mui/material';
import { Track } from '../../../interfaces/track.interface';
import { IUser } from '../../../interfaces/user.interface';
import { useAppDispatch } from '../../../app/hook';
import { useState } from 'react';
import { createTrackHistory } from '../../../features/trackHistory/trackHistory.slice';
import { useNavigate } from 'react-router-dom';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTrack } from '../../../features/tracks/tracks.slice';

interface Props {
  track: Track;
  artistName: string;
  index: number;
  user: IUser | null;
}

export function TrackItem({ track, artistName, index, user }: Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { id, title, duration } = track;

  const [state, setState] = useState({ 
    track: id
});

  const handleAddTrack = () => {
    if(user && user.token) {
      dispatch(createTrackHistory({ payload: state, token: user?.token }));
    }
    navigate('/');
  }

  const handleDeletTrack = () => {
    if(user && user.token) {
      dispatch(deleteTrack(id));
    }
    navigate('/');
  }
  
  return (
      <Card sx={{  display: 'flex', justifyContent: "space-between", width: "100%", padding: 2 }} >
        <Typography gutterBottom variant="h6" component="div">{index + 1}</Typography>
        <Typography gutterBottom variant="h5" component="div" sx={{ width: "60%" }}>{artistName} - {title}</Typography>
        <Typography gutterBottom variant="h6" component="div" sx={{ color: "#787878" }}>{duration}</Typography>
        {user && user.role === 'user' && (
          <IconButton onClick={handleAddTrack} >
            <PlaylistAddIcon fontSize='medium' color='inherit'/>
          </IconButton>
        )}
        {user && user.role === 'admin' && (
          <IconButton onClick={handleDeletTrack} >
            <DeleteIcon /> 
          </IconButton>
        )}
      </Card>
  );
}