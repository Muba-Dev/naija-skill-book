import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = "https://wojqoqzdvjadtvldnial.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvanFvcXpkdmphZHR2bGRuaWFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzODY1MzMsImV4cCI6MjEwMDk2MjUzM30.pxoKDEuESF6UBpZqHEaieFkyINJg7SzN2AMQfYGYnLQ";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
