import MultiTaskModel from "./models/MultiTaskModel";
import TaskModel from "./models/TaskModel";

function createTask(type: "task" | "multiTask", task: { title: string, description: string, dueDate: Date }, list?: string[]) {
  let newTask;
  if (type === "task") {
    newTask = new TaskModel(task?.title, task?.description, task?.dueDate);
  } else if (type === "multiTask" && list?.length) {
    newTask = new MultiTaskModel(task?.title, task?.description, task?.dueDate, list)
  } else return;
  const listHtml =
    newTask instanceof MultiTaskModel && newTask.list?.length
      ? `<ul>${newTask.list.map(item => `<li>${item}</li>`).join("")}</ul>`
      : "";
  tasks?.push(newTask);
  const newTaskHtml = `<li style="margin:.5rem auto">
  <input type="checkbox" />
  <span>${newTask?.title}</span>
  <h5>${newTask?.description}</h5>
  <h5>${newTask?.dueDate}</h5>
  ${listHtml}
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
  const listValue = form.elements["list"]?.value;
  const list = listValue?.split(",");
  console.log("list:", list);


  const formData: { title: string, description: string, dueDate: Date } = { title, description, dueDate }
  createTask(type, formData, list);
  taskModal?.hide()
});
