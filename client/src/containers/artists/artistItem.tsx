import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import imageNotAvalable from "../../assets/image/image.jpg";
import { Artist } from '../../interfaces/artist.interface';
import { IUser } from '../../interfaces/user.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '../../app/hook';
import { deleteArtist, fetchPublishArtists } from '../../features/artists/artists.slice';
import { apiURL } from '../../constants';

interface Props {
  artist: Artist;
  user: IUser | null;
}

export function ArtistItem({ artist, user }: Props) {
  const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id, name, photo, } = artist;
 
    const cardImage = photo ? `${apiURL}/uploads/${photo}` : imageNotAvalable;
    // const cardImage = !photo ? imageNotAvalable : photo;

    const handleOpen = () => {
        navigate(`/artist/${id}/albums`, { state: { artist } })
    }

    const handleDeletArtist = async () => {
      if(user && user.token) {
        await dispatch(deleteArtist(id));
        await dispatch(fetchPublishArtists());
      }
      navigate('/');
  }
  
  return (
      <Card sx={{ display: "flex", flexDirection: "column", padding: "10px", alignItems: "center" }} >
        <CardMedia
          component="img"
          image={cardImage}
          sx={{ objectFit: 'cover', objectPosition: 'center', width: '280px' }}
          alt={name}
        />
        <Box sx={{ padding: '10px' }} >
          <Typography gutterBottom variant="h4" component="div" onClick={handleOpen} sx={{ 
            cursor: "pointer", 
            color: "#0c78bf",
            marginTop: "10px", 
            "&:hover": {
                color: "#03456d"
          }}}>{name}</Typography>
        </Box>
        {user && user.role === 'admin' && (
          <IconButton onClick={handleDeletArtist} >
            <DeleteIcon /> 
          </IconButton>
        )}
      </Card>
  );
}