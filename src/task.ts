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
  const newTaskHtml = `<li class="task-item">
  <input id="task-completed-check" type="checkbox" />
  <span id="task-completed-span">${newTask?.completed ? "Completed" : "Incomplete"}</span>
  <h4>${newTask?.title}</h4>
  <h5>${newTask?.description}</h5>
  <h5>${newTask?.dueDate.toDateString()}</h5>
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
    <ul style="list-style:none;" id="tasks-ul">
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
  const type = (form.elements.namedItem("type") as HTMLInputElement)?.value as "task" | "multiTask";
  const title = (form.elements.namedItem("title") as HTMLInputElement)?.value;
  const description = (form.elements.namedItem("description") as HTMLInputElement)?.value;
  const dueDate = new Date((form.elements.namedItem("dueDate") as HTMLInputElement)?.value);
  const listValue = (form.elements.namedItem("list") as HTMLTextAreaElement)?.value;
  const list = listValue?.split(",");


  const formData: { title: string, description: string, dueDate: Date } = { title, description, dueDate }
  createTask(type, formData, list);
  taskModal?.hide();

  document.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    if (target.id === 'task-completed-check') {
      const taskItem = target.closest<HTMLLIElement>('.task-item');

      const taskCompleteEl = taskItem?.querySelector<HTMLSpanElement>('#task-completed-span');

      if (taskCompleteEl) {
        taskCompleteEl.innerText = target.checked ? 'Completed' : 'Incomplete';
      } else {
        console.error("No corresponding task-completed-span found");
      }
    }
  })
});
