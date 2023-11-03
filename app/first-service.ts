import ExternalClient from "./external-client";

export default class FirstService {
  constructor(client: ExternalClient) {}

  async getAThing(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
