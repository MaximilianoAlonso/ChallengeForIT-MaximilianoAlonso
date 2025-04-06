import { useEffect, useState } from "react";
import { createTask, getTasks, updateTask } from "../services/TaskService";
import { Task } from "../types/task";

interface TaskFormProps {
  onClose: () => void;
  taskId: number | null;
}

const TaskForm = ({ onClose, taskId }: TaskFormProps) => {
  const [task, setTask] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: false,
  });

  useEffect(() => {
    const fetchTask = async () => {
      if (taskId !== null) {
        const tasks = await getTasks();
        const found = tasks.find((t) => t.id === taskId);
        if (found) {
          setTask({
            title: found.title,
            description: found.description,
            status: found.status,
          });
        }
      }
    };
    fetchTask();
  }, [taskId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (taskId === null) {
      await createTask(task);
    } else {
      await updateTask(taskId, task);
    }
    onClose(); // cerrar el formulario y refrescar lista
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h2 className="card-title h5 mb-3">
          {taskId !== null ? "Editar Tarea" : "Crear Tarea"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Título</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={task.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="description"
              value={task.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              name="status"
              checked={!!task.status}
              onChange={handleChange}
            />
            <label className="form-check-label">Completada</label>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              {taskId !== null ? "Actualizar" : "Crear"}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
