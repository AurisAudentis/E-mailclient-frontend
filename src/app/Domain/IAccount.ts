export interface IMailAccount {
  email: string;
  password: string;
  server: IServer;
  boxes: string[];
}

export interface IServer {
  type: string;
  host: string;
  port: number;
  tls: boolean;
  authTimeout: number;
}
