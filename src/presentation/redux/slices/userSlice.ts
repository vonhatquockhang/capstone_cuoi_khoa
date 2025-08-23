import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/domain/models/user.model";
import { UserService } from "@/application/service/userService";

interface UserState {
  users: User[];
  totalPages: number;
  currentPage: number;
  keyword: string;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  totalPages: 0,
  currentPage: 1,
  keyword: "",
  loading: false,
  error: null,
};

// Async actions
export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async ({ page = 1, keyword = "" }: { page: number; keyword: string }) => {
    const res = await UserService.getUsers(page, keyword);
    return res;
  }
);

export const createAdminUser = createAsyncThunk(
  "user/createAdmin",
  async (data: Partial<User>) => {
    const res = await UserService.createAdmin(data);
    return res;
  }
);

export const updateUserById = createAsyncThunk(
  "user/update",
  async ({ id, data }: { id: string; data: Partial<User> }) => {
    const res = await UserService.updateUser(id, data);
    return res;
  }
);

export const deleteUserById = createAsyncThunk(
  "user/delete",
  async (id: string) => {
    await UserService.deleteUser(id);
    return id;
  }
);

// Slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setKeyword(state, action) {
      state.keyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Lỗi tải dữ liệu người dùng";
      })
      .addCase(createAdminUser.fulfilled, (state, action) => {
        state.users.unshift(action.payload);
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.users = state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        );
      })
      .addCase(deleteUserById.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u.id !== action.payload);
      });
  },
});

export const { setKeyword } = userSlice.actions;
export default userSlice.reducer;
