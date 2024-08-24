import {
  createUser,
  deleteUser,
  initializeAdminApp,
  listUsers,
  updateUser,
  verifyIdToken,
} from "@/services/server-side";
import { AddAdminPayload, UpdateAdminPayload } from "@/services/types";

initializeAdminApp();

async function authorize(req: Request) {
  const token = req.headers.get("Authorization")?.split("Bearer ")[1];

  if (!token) return new Response("Not authorized", { status: 401 });

  const decodedToken = await verifyIdToken(token);
  if (!decodedToken) return new Response("Not authorized", { status: 401 });

  return null;
}

export async function GET(req: Request) {
  try {
    const response = await authorize(req);
    if (response) return response;

    return new Response(
      JSON.stringify({
        message: "Successfully fetched users.",
        users: await listUsers(),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error getting users:", error);

    return new Response(JSON.stringify({ message: "Failed to get users" }), {
      status: 500,
    });
  }
}

export async function POST(req: Request) {
  try {
    const response = await authorize(req);
    if (response) return response;
    // Verify the Firebase user token
    const { email, displayName } = (await req.json()) as AddAdminPayload;

    if (email && displayName) {
      await createUser({ email, displayName });

      return new Response(
        JSON.stringify({ message: "User created successfully" }),
        { status: 201 }
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

export async function PUT(req: Request) {
  try {
    const response = await authorize(req);
    if (response) return response;
    // Verify the Firebase user token
    const { uid, email, displayName } =
      (await req.json()) as UpdateAdminPayload;

    if (uid && email && displayName) {
      await updateUser(uid, { email, displayName });

      return new Response(
        JSON.stringify({ message: "User updated successfully" }),
        { status: 204 }
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

export async function DELETE(req: Request) {
  try {
    const response = await authorize(req);
    if (response) return response;
    // Verify the Firebase user token
    const { uid } = (await req.json()) as { uid: string };

    if (uid) {
      await deleteUser(uid);

      return new Response(
        JSON.stringify({ message: "User deleted successfully" }),
        { status: 204 }
      );
    }

    return new Response(JSON.stringify({ message: "Invalid request" }), {
      status: 400,
    });
  } catch (error) {
    console.error("Error deleting user:", error);

    return new Response(JSON.stringify({ message: "Failed to delete user" }), {
      status: 500,
    });
  }
}
