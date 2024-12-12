import TaskModel from "./models/TaskModel";

function createTask(type: "task" | "multiTask", task: { title: string, description: string, dueDate: Date }) {
  const newTask = new TaskModel(task?.title, task?.description, task?.dueDate);
  tasks?.push(newTask);
  const newTaskHtml = `<li>
  <input type="checkbox" />
  <span>${newTask?.title}</span>
  <h5>${newTask?.description}</h5>
  <h5>${newTask?.dueDate}</h5>
</li>`;
  const tasksList = document.getElementById("tasks-ul")!;
  tasksList.innerHTML += newTaskHtml;
}

const tasks: TaskModel[] = [];

document.querySelector("#tasks")!.innerHTML = `
  <div>
    <h1>Tasks</h1>
    <button id="create-task-btn">New Task</button>
    <ul id="tasks-ul">
    </ul>
  </div>
`;
const taskModal: any = document.getElementById("task-modal");

document.getElementById("create-task-btn")?.addEventListener("click", () => {
  taskModal?.show()
});
document.getElementById("new-task-form")?.addEventListener("submit", (e) => {
  e?.preventDefault();
  const form = e.target as HTMLFormElement;
  const type = form.elements["type"]?.value;
  const title = form.elements["title"]?.value;
  const description = form.elements["description"]?.value;
  const dueDate = new Date(form.elements["dueDate"]?.value);

  const formData: { title: string, description: string, dueDate: Date } = { title, description, dueDate }
  createTask(type, formData);
  taskModal?.hide()
});
