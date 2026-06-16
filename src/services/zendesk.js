import axios from "axios";

const ZENDESK_EMAIL = import.meta.env.VITE_ZENDESK_EMAIL;
const ZENDESK_API_TOKEN = import.meta.env.VITE_ZENDESK_API_TOKEN;


const credentials = btoa(`${ZENDESK_EMAIL}/token:${ZENDESK_API_TOKEN}`);

const zendeskClient = axios.create({
  baseURL: "/api/v2",
  headers: {
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/json",
  },
});

export default zendeskClient;
