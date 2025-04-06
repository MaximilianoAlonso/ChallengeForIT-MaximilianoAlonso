import { useEffect, useState } from "react";
import { getTasks } from "../services/TaskService";
import { Task } from "../types/task";

interface TaskListProps {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  refresh: boolean;
}

const TaskList = ({ onEdit, onDelete, refresh }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
    };
    fetchTasks();
  }, [refresh]);

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title h5 mb-3">Lista de Tareas</h2>
        {tasks.length === 0 ? (
          <p>No hay tareas registradas.</p>
        ) : (
          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">{task.title}</h5>
                  <p className="mb-1">{task.description}</p>
                  <small className={task.status ? "text-success" : "text-muted"}>
                    {task.status ? "Completada" : "Pendiente"}
                  </small>
                </div>
                <div>
                  <button onClick={() => onEdit(task.id)} className="btn btn-sm btn-warning me-2">
                    Editar
                  </button>
                  <button onClick={() => onDelete(task.id)} className="btn btn-sm btn-danger">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskList;
