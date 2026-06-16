import { createAsyncThunk } from "@reduxjs/toolkit";
import zendeskClient from "../../../services/zendesk";

//1. Create Ticket
export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async ({ subject, description, priority, type, userName, userEmail }, { rejectWithValue }) => {
    try {
      const response = await zendeskClient.post("/tickets.json", {
        ticket: {
          subject,
          comment: { body: description },
          priority,
          type,
          requester: { name: userName, email: userEmail },
        },
      });
      return response.data.ticket;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.description || error.message
      );
    }
  }
);

// 2. Fetch My Tickets
export const fetchMyTickets = createAsyncThunk(
  "tickets/fetchMyTickets",
  async ({ userEmail }, { rejectWithValue }) => {
    try {
      const userRes = await zendeskClient.get("/users/search.json", {
        params: { query: `email:${userEmail}` },
      });
      const zendeskUser = userRes.data.users?.[0];
      if (!zendeskUser) return rejectWithValue("User not found in Zendesk.");

      const ticketsRes = await zendeskClient.get(
        `/users/${zendeskUser.id}/tickets/requested.json`,
        { params: { sort_by: "created_at", sort_order: "desc" } }
      );
      return ticketsRes.data.tickets;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.description || error.message
      );
    }
  }
);


// 3. Search My Tickets
export const searchMyTickets = createAsyncThunk(
  "tickets/searchMyTickets",
  async ({ userEmail, searchTerm }, { rejectWithValue }) => {
    try {
      const response = await zendeskClient.get("/search.json", {
        params: {
          query: `type:ticket requester:${userEmail} ${searchTerm}`,
          sort_by: "created_at",
          sort_order: "desc",
        },
      });
      return response.data.results;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.description || error.message
      );
    }
  }
);

// 4. Fetch Ticket Details
export const fetchTicketDetails = createAsyncThunk(
  "tickets/fetchTicketDetails",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await zendeskClient.get(`/tickets/${ticketId}.json`);
      return response.data.ticket;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.description || error.message
      );
    }
  }
);

// 5. Fetch Ticket Comments
export const fetchTicketComments = createAsyncThunk(
  "tickets/fetchTicketComments",
  async (ticketId, { rejectWithValue }) => {
    try {
      const response = await zendeskClient.get(
        `/tickets/${ticketId}/comments.json`
      );
      return response.data.comments;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.description || error.message
      );
    }
  }
);

// 6. Add Comment
export const addComment = createAsyncThunk(
  "tickets/addComment",
  async ({ ticketId, comment }, { dispatch, rejectWithValue }) => {
    try {
      await zendeskClient.put(`/tickets/${ticketId}.json`, {
        ticket: {
          comment: { body: comment },
        },
      });
      // Refresh comments after adding
      await dispatch(fetchTicketComments(ticketId));
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.description || error.message
      );
    }
  }
);
