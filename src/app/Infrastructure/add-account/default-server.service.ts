import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DefaultServerService {

  private defaults = {
    out: {
      gmail: {
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        authTimeout: 1000,
        type: "input",
      },
      mg: {
        host: "maxiemgeldhof.com",
        port: 993,
        tls: true,
        authTimeout: 1000,
        type: "input",
      },
      outlook: {
          host: "imap-mail.outlook.com",
          port: 993,
          tls: true,
          authTimeout: 1000,
          type: "input",
      }
    },
    in: {}
  };

  constructor() { }

  get(direc: string, pick: string) {
    return this.defaults[direc][pick];
  }
}
