import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://68385dcb2c55e01d184d0632.mockapi.io/api/videobelajar/classUsers";

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
    totalModules: item.totalModules || 3,
    completedModules: item.completedModules || 0,
    duration: item.duration || 0,
    instructorName: item.instructorName || "Instruktur",
    instructorJob: item.instructorJob || "Profesional",
    modules: item.modules || generateDefaultModules(item),
    rating: item.rating || 3.5,
    reviewCount: item.reviewCount || 86,
    description: item.description || "Pelajari dan praktikkan skill teknis dalam berbagai industri",
    progress: Math.round((item.completedModules || 0) / (item.totalModules || 3)),
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
    status: "idle",
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

function generateDefaultModules(classItem) {
  return [
    {
      id: 1,
      title: `Video: ${classItem.title || "Kelas Baru"}`,
      type: "video",
      duration: classItem.duration ? classItem.duration / 3 : 15,
      completed: false,
    },
    {
      id: 2,
      title: `Rangkuman: ${classItem.title || "Kelas Baru"}`,
      type: "summary",
      duration: 10,
      completed: false,
    },
    {
      id: 3,
      title: `Quiz: ${classItem.title || "Kelas Baru"}`,
      type: "quiz",
      questionCount: 10,
      completed: false,
    },
  ];
}

export const updateClassProgress = createAsyncThunk("classes/updateProgress", async (updatedClass) => {
  const response = await axios.put(`${API_URL}/${updatedClass.id}`, updatedClass);
  return response.data;
});

// .addCase(updateClassProgress.fulfilled, (state, action) => {
//   const index = state.items.findIndex(item => item.id === action.payload.id);
//   if (index !== -1) {
//     state.items[index] = action.payload;
//   }
// })
