import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosApiClient } from '../../api/axiosApiClient';
import { Album } from '../../interfaces/album.interface';

interface State {
  albums: Album[];
  error: null | string;
  isLoading: boolean;
}

const initialState: State = {
  albums: [],
  error: null,
  isLoading: false,
};

export const fetchAlbums = createAsyncThunk<Album[]>('fetch/albums', async () => {
  const { data } = await axiosApiClient.get<Album[]>('/albums');
  return data;
});

export const fetchPublishAlbums = createAsyncThunk<Album[]>('fetch/publishalbums', async () => {
  const { data } = await axiosApiClient.get<Album[]>('/albums/publish');
  return data;
});

export const fetchPublishArtistAlbums = createAsyncThunk('fetch/publishArtistAlbums', async (id: string) => {
  const { data } = await axiosApiClient.get(`/albums/publish?artist=${id}`);
  return data;
});

export const createAlbum = createAsyncThunk('create/album', async (payload: FormData) => {
  const { data } = await axiosApiClient.post('/albums', payload);
  return data;
});

export const createPublishAlbum = createAsyncThunk('create/publishAlbum', async (id:string) => {
  const { data } = await axiosApiClient.post(`/albums/${id}/publish`);
  return data;
});

export const deleteAlbum = createAsyncThunk('delete/Album', async (id: string) => {
  const { data } = await axiosApiClient.delete(`/albums/${id}`);
  return data;
});


const albumSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchAlbums.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAlbums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(fetchPublishAlbums.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublishAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPublishAlbums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(fetchPublishArtistAlbums.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPublishArtistAlbums.fulfilled, (state, action) => {
        state.albums = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchPublishArtistAlbums.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in fetchProducts';
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'error exception in createAlbum';
      })
  },
});

export default albumSlice;