import {Observable} from "rxjs";
import {IMail} from "./IMail";

export interface mails {
  getMailForBox(account: string, box: string): Observable<IMail[]>;
  getMailByUid(account: string, box: string, uid: number): Observable<IMail>
}
