import { useState, ChangeEvent, FormEvent } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import FormField from '../UI/Form/FormField';
import FileInput from '../UI/Form/FileInput';
import { useAppDispatch } from '../../app/hook';
import { useNavigate } from 'react-router-dom';
import { createArtist } from '../../features/artists/artists.slice';

interface State {
    name: string;
    description: string;
    photo?: string;
}

const FormAddArtist = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    name: '',
    description: '',
    photo: ''
  });

  const onSubmit = async (formData: FormData) => {
    await dispatch(createArtist(formData));
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

  const inputChangeHandler = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
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
            label="Name"
            value={state.name}
            onChange={inputChangeHandler}
            name="name"
          />
        </Grid>
        <Grid item xs>
          <FormField
            label="Description"
            value={state.description}
            onChange={inputChangeHandler}
            name="description"
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

export default FormAddArtist;