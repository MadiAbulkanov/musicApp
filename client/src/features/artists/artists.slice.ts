import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Artist } from '../../interfaces/artist.interface';
import { axiosApiClient } from '../../api/axiosApiClient';

interface State {
  artists: Artist[];
  error: null | string;
  isLoading: boolean;
}

const initialState: State = {
  artists: [],
  error: null,
  isLoading: false,
};

export const fetchArtists = createAsyncThunk<Artist[]>('fetch/artists', async () => {
  const { data } = await axiosApiClient.get<Artist[]>('/artists');
  return data;
});

export const fetchPublishArtists = createAsyncThunk<Artist[]>('fetch/PublishArtists', async () => {
  const { data } = await axiosApiClient.get<Artist[]>('/artists/publish');
  return data;
});

export const createArtist = createAsyncThunk('create/artist', async (payload: FormData) => {
  const { data } = await axiosApiClient.post('/artists', payload);
  return data;
});

export const createPublishArtist = createAsyncThunk('create/publishArtist', async (id: string) => {
  const { data } = await axiosApiClient.post(`/artists/${id}/publish`);
  return data;
});

export const deleteArtist = createAsyncThunk('delete/Artist', async (id: string) => {
  const { data } = await axiosApiClient.delete(`/artists/${id}`);
  return data;
});

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchArtists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchArtists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(fetchPublishArtists.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublishArtists.fulfilled, (state, action) => {
        state.artists = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPublishArtists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
  },
});

export default artistSlice;
