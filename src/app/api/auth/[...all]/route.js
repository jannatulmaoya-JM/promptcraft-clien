import { auth } from "@/lib/auth"; 
import { toNextJsHandler } from "better-auth/next-js";

//export const { POST, GET } = toNextJsHandler(auth);
const handler = toNextJsHandler(auth);

export const { POST, GET } = handler;
