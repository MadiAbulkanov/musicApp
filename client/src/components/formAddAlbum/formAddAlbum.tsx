import { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import FormField from '../UI/Form/FormField';
import FileInput from '../UI/Form/FileInput';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchPublishArtists } from '../../features/artists/artists.slice';
import { useNavigate } from 'react-router-dom';
import { createAlbum } from '../../features/albums/albums.slice';

interface State {
  title: string;
  release: string;
  image: string;
  artistId: string;
}

const FormAddAlbum = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

  const artists = useAppSelector((state) => {
    return state.artists.artists;
});

  const [state, setState] = useState<State>({
    title: '',
    release: '',
    image: '',
    artistId: '',
  });

useEffect(() => {
    dispatch(fetchPublishArtists());
  }, [dispatch]);


  const onSubmit = async (formData: FormData) => {  
    await dispatch(createAlbum(formData));
    navigate('/');
  }

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      if (typeof value === 'object') {
        formData.append(key, value);
      } else {
        formData.append(key, `${value}`);
      }
    });

    onSubmit(formData);
  };

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (file) {
      const { name } = e.target;
      setState((prevState) => ({ ...prevState, [name]: file }));
    }
  };

  return (
    <Container>
     <Box component={'form'} autoComplete="off" onSubmit={submitFormHandler} paddingY={2}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs>
          <FormField
            label="Title"
            value={state.title}
            onChange={inputChangeHandler}
            name="title"
          />
        </Grid>

        <Grid item xs>
          <FormField
            label=""
            value={state.release}
            onChange={inputChangeHandler}
            name="release"
            type="date"
          />
        </Grid>

        <Grid item xs>
          <FormField
            label="Artist"
            value={state.artistId}
            onChange={inputChangeHandler}
            name="artistId"
            select options={artists}
          />
        </Grid>

        <Grid item xs>
          <FileInput label="Image" name="image" onChange={fileChangeHandler} />
        </Grid>

        <Grid item xs>
          <Button type="submit" color="primary" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </Box> 
    </Container>
    
  );
};

export default FormAddAlbum;