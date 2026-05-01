import { getPayload } from "payload";
import config from "@/payload.config";

let cached: Awaited<ReturnType<typeof getPayload>> | null = null;

export async function getPayloadClient() {
  if (!cached) {
    cached = await getPayload({ config });
  }
  return cached;
}
