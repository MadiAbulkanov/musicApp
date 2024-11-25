import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardMedia,
  Button,
  Box,
  Typography,
  CardActions,
  IconButton,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import imageNotAvalable from "../../../assets/image/image.jpg";
import { Album } from '../../../interfaces/album.interface';
// import { apiURL } from '../../../constants';
import { Artist } from '../../../interfaces/artist.interface';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUser } from '../../../interfaces/user.interface';
import { useAppDispatch } from '../../../app/hook';
import { deleteAlbum } from '../../../features/albums/albums.slice';

interface Props {
  album: Album;
  artist: Artist;
  user: IUser | null;
}

export function AlbumItem({ album, artist, user }: Props) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id, title, release, image } = album;
 
    // const cardImage = image ? `${apiURL}/uploads/${image}` : imageNotAvalable;
    const cardImage = !image ? imageNotAvalable : image;

    const dateFormatting = new Date(release).toLocaleDateString();
    const timeFormatting = new Date(release).toLocaleTimeString();

    const handleOpen = () => {
        navigate(`/album/${id}/tracks`, { state: { album, artist } })
    }

    const handleDeletAlbum = () => {
      if(user && user.token) {
        dispatch(deleteAlbum(id));
      }
      navigate('/');
  }
  
  return (
      <Card sx={{  display: 'flex', flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between", alignItems: "center", padding: 1 }} >
        <CardMedia
          component="img"
          image={cardImage}
          sx={{ objectFit: 'cover', objectPosition: 'center', width: '20%' }}
          alt={title}
        />
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center", flexGrow: 1, justifyContent: "space-around" }} >
            <Typography gutterBottom variant="h5" component="div">{title}</Typography>
            <Typography gutterBottom variant="h5" component="div">{dateFormatting} {timeFormatting}</Typography>
            <CardActions>
              <Button variant="contained" endIcon={<SendIcon />}  sx={{ padding: '5px 10px', margin: '5px' }} onClick={handleOpen} >
                Open
              </Button>
              {user && user.role === 'admin' && (
          <IconButton onClick={handleDeletAlbum} >
            <DeleteIcon /> 
          </IconButton>
        )}
            </CardActions>
        </Box>
      </Card>
  );
}