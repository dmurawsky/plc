import { NextApiRequest, NextApiResponse } from "next";
import {
  createUser,
  initializeAdminApp,
  verifyIdToken,
} from "@/services/server-side";
import { AddAdminPayload } from "@/services/types";

initializeAdminApp();

export async function POST(req: Request, res: NextApiResponse) {
  try {
    // Verify the Firebase user token
    const { token, email, displayName } = (await req.json()) as AddAdminPayload;

    const decodedToken = await verifyIdToken(token);

    if (email && displayName && decodedToken) {
      await createUser({ email, displayName });

      return new Response(
        JSON.stringify({ message: "User created successfully" }),
        { status: 200 }
      );
    }

    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  } catch (error) {
    console.error("Error creating user:", error);

    return new Response(JSON.stringify({ message: "Failed to create user" }), {
      status: 500,
    });
  }
}
