import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import TaskList from "./components/Task-List";
import TaskForm from "./components/Task-Form";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { deleteTask } from "./services/TaskService";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [refreshTasks, setRefreshTasks] = useState(false);

  const handleCreateClick = () => {
    setEditTaskId(null);
    setShowForm(true);
  };

  const handleEditClick = (id: number) => {
    setEditTaskId(id);
    setShowForm(true);
  };

  const handleDeleteClick = async (id: number) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await deleteTask(id);
      Swal.fire("Eliminado", "La tarea fue eliminada", "success");
      setRefreshTasks(!refreshTasks);
    }
  };

  const handleFormClose = () => {
    Swal.fire({
      icon: "success",
      title: "Éxito",
      text: editTaskId !== null ? "Tarea actualizada" : "Tarea creada",
      timer: 1500,
      showConfirmButton: false,
    });
    setShowForm(false);
    setEditTaskId(null);
    setRefreshTasks(!refreshTasks); // Trigger a refresh of the task list
  };

  return (
    <BrowserRouter>
      <div className="container mt-4" style={{ backgroundColor: "#f3e5f5", minHeight: "100vh" }}>
        <header className="mb-4 d-flex justify-content-between align-items-center">
          <h1 className="h3">Gestor de Tareas</h1>  
          <button onClick={handleCreateClick} className="btn btn-primary">
            Crear Tarea
          </button>
        </header>

        {showForm && (
          <TaskForm onClose={handleFormClose} taskId={editTaskId} />
        )}

        <TaskList onEdit={handleEditClick} onDelete={handleDeleteClick} refresh={refreshTasks} />
      </div>
    </BrowserRouter>
  );
};

export default App;
