"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function logout() {
  try {
    // clear cookies
    cookies().delete("next-auth.session-token");

    redirect(`${process.env.NEXT_PUBLIC_SERVICE_URL}/login`);
  } catch (error) {
    throw error;
  }
}
