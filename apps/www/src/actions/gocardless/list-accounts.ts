"use server";

import fetch from "node-fetch";

import { getAccessToken } from "./accsessToken";

export async function listAccounts(requisitionId: string) {
  const accessToken = await getAccessToken();
  try {
    const response = await fetch(
      `https://bankaccountdata.gocardless.com/api/v2/requisitions/${requisitionId}/`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response text:", errorText);
      throw new Error("Failed to list accounts");
    }

    const data = await response.json();
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error listing accounts:", error);
    throw error;
  }
}
