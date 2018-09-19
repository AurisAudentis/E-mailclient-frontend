import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {IMail} from "../../Domain/IMail";


@Injectable({
  providedIn: "root"
})
export class MailHttpService {
  // TODO: use actual `` templates

  constructor(private httpClient: HttpClient) {
  }

  public getMailsFromBox(account: string, box: string, page: number): Observable<IMail[]> {
    const fullBoxUrl = `${environment.baseUrl}/mail/mailbox/${account}/${box}`;

    const params = new HttpParams().set("page", String(page));
    return this.httpClient.get <IMail[]> (fullBoxUrl, {params})
  }

  public getSingleMail(account: string, box: string, uid: Number) {
    const singleMailUrl = `${environment.baseUrl}/mail/mailbox/${account}/${box}/${uid}`;
    return this.httpClient.get(singleMailUrl);
  }
}
