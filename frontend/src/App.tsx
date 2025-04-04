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
      .then(data => setTasks(data.tasks))
      .catch(error => console.error("Error al obtener los datos:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Tareas</h1>
      <ul>
  {tasks.map(task => (
    <li key={task.id}>
       <h4>{task.id} - {task.title}</h4>
    
      <p>{task.description}</p>
      <p>{task.status === true ? "Pendiente" : "Terminada"}</p>
      <p>{task.createdAt}</p>
      <br />
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
