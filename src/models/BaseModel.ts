export default class BaseModel {
  public id: string;
  public createdAt: Date;
  constructor(id?: string) {
    this.id = id ? id : crypto.randomUUID();
    this.createdAt = new Date();
  }

  getId() {
    console.log(this.id);
    return this.id;
  }

}