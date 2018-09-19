import {IMailAccount} from "./IAccount";

export interface IUser {
  email: string;
  accounts: IMailAccount[];
}
