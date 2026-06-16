import { createSlice } from "@reduxjs/toolkit";
import {
  createTicket,
  fetchMyTickets,
  searchMyTickets,
  fetchTicketDetails,
  fetchTicketComments,
  addComment,
} from "./ticketThunks";

const initialState = {
  tickets: [],
  searchedTickets: [],
  selectedTicket: null,
  comments: [],
  loading: false,
  error: null,
  success: false,
};

// set loading state
const setPending = (state) => {
  state.loading = true;
  state.error = null;
  state.success = false;
};

const setRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
  state.success = false;
};


const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedTicket: (state) => {
      state.selectedTicket = null;
      state.comments = [];
    },
    clearSearchResults: (state) => {
      state.searchedTickets = [];
    },
  },
  extraReducers: (builder) => {
    // createTicket
    builder
      .addCase(createTicket.pending, setPending)
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tickets.unshift(action.payload);
      })
      .addCase(createTicket.rejected, setRejected);

    // fetchMyTickets
    builder
      .addCase(fetchMyTickets.pending, setPending)
      .addCase(fetchMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchMyTickets.rejected, setRejected);

    // searchMyTickets
    builder
      .addCase(searchMyTickets.pending, setPending)
      .addCase(searchMyTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.searchedTickets = action.payload;
      })
      .addCase(searchMyTickets.rejected, setRejected);

    // fetchTicketDetails
    builder
      .addCase(fetchTicketDetails.pending, setPending)
      .addCase(fetchTicketDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTicket = action.payload;
      })
      .addCase(fetchTicketDetails.rejected, setRejected);

    // fetchTicketComments
    builder
      .addCase(fetchTicketComments.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchTicketComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchTicketComments.rejected, setRejected);

    // addComment
    builder
      .addCase(addComment.pending, setPending)
      .addCase(addComment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addComment.rejected, setRejected);
  },
});

export const { clearError, clearSuccess, clearSelectedTicket, clearSearchResults } =
  ticketSlice.actions;

// Selectors
export const selectTickets = (state) => state.tickets.tickets;
export const selectSearchedTickets = (state) => state.tickets.searchedTickets;
export const selectSelectedTicket = (state) => state.tickets.selectedTicket;
export const selectComments = (state) => state.tickets.comments;
export const selectLoading = (state) => state.tickets.loading;
export const selectError = (state) => state.tickets.error;
export const selectSuccess = (state) => state.tickets.success;

export default ticketSlice.reducer;
