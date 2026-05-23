import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TodoContext } from "./context/TodoContext.jsx";

const API = import.meta.env.VITE_API_URL;

function App() {
  const { tasks, setTasks } = useContext(TodoContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueByDate, setDueByDate] = useState("");

  const [editId, setEditId] = useState(null);

  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    dueByDate: "",
  });

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API);

      setTasks(response.data);
      setError("");
    } catch (error) {
      setError("Unable to fetch tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    try {
      if (!title || !description || !dueByDate) {
        setError("Please fill all task fields.");
        return;
      }

      await axios.post(API, {
        title,
        description,
        dueByDate,
      });

      setTitle("");
      setDescription("");
      setDueByDate("");

      loadTasks();
    } catch (error) {
      setError("Unable to add task.");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      loadTasks();
    } catch (error) {
      setError("Unable to delete task.");
    }
  };

  const startEdit = (task) => {
    setEditId(task._id);

    setEditTask({
      title: task.title || "",
      description: task.description || "",
      dueByDate: task.dueByDate
        ? task.dueByDate.split("T")[0]
        : "",
    });
  };

  const updateTask = async (id) => {
    try {
      if (
        !editTask.title ||
        !editTask.description ||
        !editTask.dueByDate
      ) {
        setError("Please fill all task fields.");
        return;
      }

      await axios.put(`${API}/${id}`, {
        title: editTask.title,
        description: editTask.description,
        dueByDate: editTask.dueByDate,
      });

      setEditId(null);

      setEditTask({
        title: "",
        description: "",
        dueByDate: "",
      });

      loadTasks();
    } catch (error) {
      setError("Unable to update task.");
    }
  };

  const toggleStatus = async (task) => {
    try {
      const updatedStatus =
        task.status === "completed"
          ? "pending"
          : "completed";

      await axios.patch(`${API}/${task._id}/status`, {
        status: updatedStatus,
      });

      loadTasks();
    } catch (error) {
      setError("Unable to update task status.");
    }
  };

  const searchTasks = async () => {
    try {
      const response = await axios.get(`${API}?q=${search}`);

      setTasks(response.data);
    } catch (error) {
      setError("Unable to search tasks.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Todo Application</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading && <p>Loading tasks...</p>}

      <div style={styles.inputBox}>
        <input
          style={styles.input}
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          style={styles.input}
          type="date"
          value={dueByDate}
          onChange={(e) => setDueByDate(e.target.value)}
        />

        <button style={styles.addBtn} onClick={addTask}>
          Add Task
        </button>
      </div>

      <div style={styles.searchBox}>
        <input
          style={styles.input}
          placeholder="Search task..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button style={styles.searchBtn} onClick={searchTasks}>
          Search
        </button>

       <button
  style={styles.resetBtn}
  onClick={() => {
    setSearch("");
    loadTasks();
  }}
>
  Reset
</button></div>

      {tasks.map((task) => (
        <div key={task._id} style={styles.card}>
          {editId === task._id ? (
            <div style={styles.inputBox}>
              <input
                style={styles.input}
                value={editTask.title}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    title: e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                value={editTask.description}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    description: e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                type="date"
                value={editTask.dueByDate}
                onChange={(e) =>
                  setEditTask({
                    ...editTask,
                    dueByDate: e.target.value,
                  })
                }
              />

              <button
                style={styles.saveBtn}
                onClick={() => updateTask(task._id)}
              >
                Save
              </button>
            </div>
          ) : (
            <>
              <h3>{task.title}</h3>
              <p>{task.description}</p>

              <small>
                Due Date:
                {" "}
                {task.dueByDate
                  ? new Date(task.dueByDate).toLocaleDateString()
                  : "No date"}
              </small>

              <p>Status: {task.status}</p>

              <div style={styles.buttonGroup}>
                <button
                  style={styles.editBtn}
                  onClick={() => startEdit(task)}
                >
                  Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>

                <button
                  style={styles.completeBtn}
                  onClick={() => toggleStatus(task)}
                >
                  {task.status === "completed"
                    ? "Undo"
                    : "Complete"}
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "2rem auto",
    padding: "1.5rem",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    textAlign: "center",
    marginBottom: "1.5rem",
    color: "#333",
  },

  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
    marginBottom: "1rem",
  },

  input: {
    padding: "0.8rem",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "1rem",
  },

  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1rem",
    marginBottom: "1rem",
    backgroundColor: "#fafafa",
  },

  buttonGroup: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.8rem",
    flexWrap: "wrap",
  },

  addBtn: {
    padding: "0.7rem",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  editBtn: {
    padding: "0.5rem 0.8rem",
    backgroundColor: "#f59e0b",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "0.5rem 0.8rem",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  saveBtn: {
    padding: "0.5rem 0.8rem",
    backgroundColor: "#10b981",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  searchBtn: {
    padding: "0.6rem 1rem",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  resetBtn: {
    padding: "0.6rem 1rem",
    backgroundColor: "#6b7280",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  completeBtn: {
    padding: "0.5rem 0.8rem",
    backgroundColor: "#14b8a6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },

  searchBox: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
};

export default App;
