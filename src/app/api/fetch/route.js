import { getTasks } from "../../actions/read";

export async function GET() {
  try {
    const tasks = await getTasks();
    console.log("GET: ", tasks);
    return new Response(JSON.stringify({ success: true, data: tasks }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      status: 500,
    });
  }
}
