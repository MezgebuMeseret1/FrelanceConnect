import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import * as milestoneService from "../../../core/services/milestone.service";

// ======================================================
// HELPERS
// ======================================================

const extractData = (payload) => {
  return payload?.data || payload;
};

const updateMilestoneInList = (
  milestones,
  updatedMilestone
) => {
  return milestones.map((milestone) =>
    milestone.id === updatedMilestone.id
      ? updatedMilestone
      : milestone
  );
};

// ======================================================
// FETCH CONTRACT MILESTONES
// ======================================================

export const fetchContractMilestones =
  createAsyncThunk(
    "milestone/fetchContractMilestones",

    async (contractId, thunkAPI) => {
      try {
        const response =
          await milestoneService.getContractMilestones(
            contractId
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch milestones"
        );
      }
    }
  );

// ======================================================
// FETCH SINGLE MILESTONE
// ======================================================

export const fetchMilestoneById =
  createAsyncThunk(
    "milestone/fetchMilestoneById",

    async (id, thunkAPI) => {
      try {
        const response =
          await milestoneService.getMilestoneById(
            id
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch milestone"
        );
      }
    }
  );

// ======================================================
// CREATE MILESTONE
// ======================================================

export const createMilestone =
  createAsyncThunk(
    "milestone/createMilestone",

    async (milestoneData, thunkAPI) => {
      try {
        const response =
          await milestoneService.createMilestone(
            milestoneData
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to create milestone"
        );
      }
    }
  );

// ======================================================
// UPDATE MILESTONE
// ======================================================

export const updateMilestone =
  createAsyncThunk(
    "milestone/updateMilestone",

    async ({ id, data }, thunkAPI) => {
      try {
        const response =
          await milestoneService.updateMilestone(
            id,
            data
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update milestone"
        );
      }
    }
  );

// ======================================================
// UPDATE MILESTONE STATUS
// ======================================================

export const updateMilestoneStatus =
  createAsyncThunk(
    "milestone/updateMilestoneStatus",

    async ({ id, status }, thunkAPI) => {
      try {
        const response =
          await milestoneService.updateMilestoneStatus(
            id,
            status
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to update milestone status"
        );
      }
    }
  );

// ======================================================
// SUBMIT MILESTONE
// ======================================================

export const submitMilestone =
  createAsyncThunk(
    "milestone/submitMilestone",

    async ({ id, submissionData }, thunkAPI) => {
      try {
        const response =
          await milestoneService.submitMilestone(
            id,
            submissionData
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to submit milestone"
        );
      }
    }
  );

// ======================================================
// APPROVE MILESTONE
// ======================================================

export const approveMilestone =
  createAsyncThunk(
    "milestone/approveMilestone",

    async (id, thunkAPI) => {
      try {
        const response =
          await milestoneService.approveMilestone(
            id
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to approve milestone"
        );
      }
    }
  );

// ======================================================
// RELEASE MILESTONE PAYMENT
// ======================================================

export const releaseMilestonePayment =
  createAsyncThunk(
    "milestone/releaseMilestonePayment",

    async (id, thunkAPI) => {
      try {
        const response =
          await milestoneService.releaseMilestonePayment(
            id
          );

        return extractData(response.data);
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to release payment"
        );
      }
    }
  );

// ======================================================
// INITIAL STATE
// ======================================================

const initialState = {
  milestones: [],
  currentMilestone: null,

  loading: false,
  success: false,
  error: null,
};

// ======================================================
// SLICE
// ======================================================

const milestoneSlice = createSlice({
  name: "milestone",

  initialState,

  reducers: {
    clearMilestoneState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },

    clearCurrentMilestone: (state) => {
      state.currentMilestone = null;
    },

    resetMilestoneSuccess: (state) => {
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder;

    // ==================================================
    // FETCH CONTRACT MILESTONES
    // ==================================================

    builder
      .addCase(
        fetchContractMilestones.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchContractMilestones.fulfilled,
        (state, action) => {
          state.loading = false;

          state.milestones =
            action.payload?.data ||
            action.payload ||
            [];
        }
      )

      .addCase(
        fetchContractMilestones.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // FETCH SINGLE MILESTONE
    // ==================================================

    builder
      .addCase(
        fetchMilestoneById.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchMilestoneById.fulfilled,
        (state, action) => {
          state.loading = false;

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        fetchMilestoneById.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // CREATE MILESTONE
    // ==================================================

    builder
      .addCase(
        createMilestone.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        createMilestone.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.milestones.push(
            action.payload
          );

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        createMilestone.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // UPDATE MILESTONE
    // ==================================================

    builder
      .addCase(
        updateMilestone.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateMilestone.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.milestones =
            updateMilestoneInList(
              state.milestones,
              action.payload
            );

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        updateMilestone.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // UPDATE MILESTONE STATUS
    // ==================================================

    builder
      .addCase(
        updateMilestoneStatus.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateMilestoneStatus.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.milestones =
            updateMilestoneInList(
              state.milestones,
              action.payload
            );

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        updateMilestoneStatus.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // SUBMIT MILESTONE
    // ==================================================

    builder
      .addCase(
        submitMilestone.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        submitMilestone.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        submitMilestone.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // APPROVE MILESTONE
    // ==================================================

    builder
      .addCase(
        approveMilestone.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        approveMilestone.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        approveMilestone.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );

    // ==================================================
    // RELEASE PAYMENT
    // ==================================================

    builder
      .addCase(
        releaseMilestonePayment.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        releaseMilestonePayment.fulfilled,
        (state, action) => {
          state.loading = false;
          state.success = true;

          state.currentMilestone =
            action.payload;
        }
      )

      .addCase(
        releaseMilestonePayment.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearMilestoneState,
  clearCurrentMilestone,
  resetMilestoneSuccess,
} = milestoneSlice.actions;

export default milestoneSlice.reducer;