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
          console.log("result.data: ",result.data); // Inspect the structure of the fetched tasks
          setTasks(result.data);
          console.log("set task: ",tasks); // Inspect the structure of the fetched tasks
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
    return <div>Loading tasks...</div>;
  }

  return <ListTask tasks={tasks} />;
};

export default Page;
