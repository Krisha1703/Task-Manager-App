//Fetch task from api and pass it to ListTask component
"use client";
import { useEffect, useState } from "react";
import ListTask from "@/components/list-task";

const Page = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/fetch");
        const result = await response.json();
        if (result.success) {
          setTasks(result.data);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return <div className="justify-center items-center text-center text-xl font-semibold">Loading tasks...</div>;
  }

  return <ListTask tasks={tasks} />;
};

export default Page;
