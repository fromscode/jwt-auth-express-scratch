export default class error404 extends Error {
  status: number;
  message: string;
  constructor(message?: string) {
    super(message);
    this.status = 404;
    this.message = message || "The requested resource could not be found";
  }
}
