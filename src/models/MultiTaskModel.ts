import TaskModel from "./TaskModel";

export default class MultiTaskModel extends TaskModel {
  public list: string[];
  constructor(title: string, description: string, dueDate: Date, list: string[]) {
    super(title, description, dueDate);
    this.list = list;
  }
  editList(newList: string[]) {
    this.list = newList;
  }
}