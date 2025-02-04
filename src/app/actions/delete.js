"use server";

export const deleteTask = async (taskId) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Use environment variable or localhost
    const res = await fetch(`${baseUrl}/api/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ taskId }), // Send taskId in the request body
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: error.message };
  }
};
