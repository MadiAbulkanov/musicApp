import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '../../api/axiosApiClient';
import { Track } from '../../interfaces/track.interface';

interface State {
  tracks: Track[];
  error: null | string;
  isLoading: boolean;
}

const initialState: State = {
  tracks: [],
  error: null,
  isLoading: false,
};

export const fetchTracks = createAsyncThunk<Track[]>('fetch/tracks', async () => {
  const { data } = await axiosApiClient.get<Track[]>('/tracks');
  return data;
});

export const fetchPublishAlbumTracks = createAsyncThunk('fetch/publishAlbumTracks', async (id: string) => {
    const { data } = await axiosApiClient.get(`/tracks/publish?album=${id}`);
    return data;
});

export const createTrack = createAsyncThunk('create/track', async (payload: FormData) => {
  const { data } = await axiosApiClient.post('/tracks', payload);
  return data;
});

export const createPublishTrack = createAsyncThunk('create/publishTrack', async (id: string) => {
  const { data } = await axiosApiClient.post(`/tracks/${id}/publish`);
  return data;
});

export const deleteTrack = createAsyncThunk('delete/Track', async (id: string) => {
  const { data } = await axiosApiClient.delete(`/tracks/${id}`);
  return data;
});


const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchTracks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(fetchPublishAlbumTracks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublishAlbumTracks.fulfilled, (state, action) => {
        state.tracks = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPublishAlbumTracks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(createTrack.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in createTrack';
      })
  },
});

export default trackSlice;