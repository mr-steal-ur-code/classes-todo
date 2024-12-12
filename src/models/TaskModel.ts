import BaseModel from "./BaseModel";

export default class TaskModel extends BaseModel {
  public completed: boolean;
  public title: string;
  public description: string;
  public dueDate: Date;
  constructor(title: string, description: string, dueDate: Date) {
    super()
    this.completed = false;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
  }
  toggleCompleted() {
    this.completed = !this.completed;
    console.log(
      `${this.title} is now ${this.completed ? "completed" : "incomplete"}.`
    );
  }

}