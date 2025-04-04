import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: string; 
}
function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api")
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
        {tasks.map(task => (
          <div  key={task.id}>
          <li>{task.title}</li>
          <li>{task.description}</li>
          <li>{task.status === true ? "Pendiente": "Terminada"}</li>
          <li>{task.createdAt}</li>
          </div>
         
        ))}
      </ul>
    </div>
  );
}

export default App;
