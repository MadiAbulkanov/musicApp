import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Box, Button, Container, Grid } from "@mui/material";
import FormField from "../UI/Form/FormField";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useNavigate } from "react-router-dom";
import { fetchPublishAlbums } from "../../features/albums/albums.slice";
import { createTrack } from "../../features/tracks/tracks.slice";

interface State {
  title: string;
  duration: string;
  albumId: string;
}

const FormAddTrack = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const albums = useAppSelector((state) => {
    return state.albums.albums;
  });

  const [state, setState] = useState<State>({
    title: "",
    duration: "",
    albumId: "",
  });

  useEffect(() => {
    dispatch(fetchPublishAlbums());
  }, [dispatch]);

  const onSubmit = async (formData: FormData) => {
    await dispatch(createTrack(formData));
    navigate("/");
  };

  const submitFormHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData();

    Object.entries(state).forEach(([key, value]) => {
      if (typeof value === "object") {
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

  return (
    <Container>
     <Box
      component={"form"}
      autoComplete="off"
      onSubmit={submitFormHandler}
      paddingY={2}
    >
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
            label="Duration"
            value={state.duration}
            onChange={inputChangeHandler}
            name="duration"
          />
        </Grid>

        <Grid item xs>
          <FormField
            label="Album"
            value={state.albumId}
            onChange={inputChangeHandler}
            name="albumId"
            select
            options={albums}
          />
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

export default FormAddTrack;
