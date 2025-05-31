import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://68385dcb2c55e01d184d0632.mockapi.io/api/videobelajar/classesData";

// Async Thunks
export const fetchClasses = createAsyncThunk("classes/fetchClasses", async () => {
  const response = await axios.get(API_URL);
  return response.data.map((item) => ({
    id: item.id,
    invoice: item.invoice || `HEL/VI/${Math.floor(1000 + Math.random() * 9000)}`,
    time: new Date(item.createdAt || item.time),
    status: item.completed ? "completed" : "ongoing",
    title: item.title || item.productName || "Kelas Belum Diberi Judul",
    price: item.price || 0,
    image: item.image || item.thumbnail || "/avatar/satu.png",
    total_payment: item.totalPayment || item.price || 0,
    totalModules: item.totalModules || 1, // Default 1 untuk menghindari pembagian 0
    completedModules: item.completedModules || 0,
    duration: item.duration || 0,
    instructorName: item.instructorName || "Instruktur",
    instructorJob: item.instructorJob || "Profesional",
    // Hitung progres sebagai persentase
    progress: Math.round((item.completedModules || 0) / (item.totalModules || 1)),
  }));
});

export const deleteClass = createAsyncThunk("classes/deleteClass", async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const classesSlice = createSlice({
  name: "classes",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteClass.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default classesSlice.reducer;
