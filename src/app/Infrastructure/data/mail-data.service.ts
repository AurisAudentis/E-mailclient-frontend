import {Injectable} from "@angular/core";
import {MailHttpService} from "../api/mail-http.service";
import {BehaviorSubject, forkJoin, from, Observable, of, Subject} from "rxjs";
import {IMail, mailIsEqual} from "../../Domain/IMail";
import {catchError, distinctUntilChanged, filter, flatMap, map, switchMap, take, tap} from "rxjs/operators";
import {UserService} from "../api/user.service";
import {IMailAccount} from "../../Domain/IAccount";
import {mails} from "../../Domain/Mails";

@Injectable({
  providedIn: "root"
})
export class MailDataService implements mails{

  public mailStorage: Subject<{ [account: string]: { [box: string]: IMail[] } }> = new BehaviorSubject({});

  constructor(private httpService: MailHttpService, private userService: UserService) {
    this.initialize();
  }

  public getMailForBox(account: string, box: string): Observable<IMail[]> {
    return this.mailStorage
      .pipe(
        map(obj => obj[account]),
        filter(obj => !!obj),
        map(obj => obj[box]),
        filter(obj => !!obj),
        distinctUntilChanged(mailIsEqual)
      );
  }

  public getMailByUid(account: string, box: string, uid: number): Observable<IMail> {
    return this.mailStorage
      .pipe(
        map(obj => obj[account][box][uid]),
        distinctUntilChanged(mailIsEqual),
        switchMap(obj => obj ? of(obj):this.httpService.getSingleMail(account, box, uid)),
        catchError(() => this.httpService.getSingleMail(account, box, uid))
      )
  }

  private initialize() {
    this.userService.getCurrentUser()
      .pipe(
        map(user => user.accounts),
        flatMap(accounts => from(accounts))
      )
      .subscribe(this.initializeAccount.bind(this));
  }

  private initializeAccount(account: IMailAccount) {
    account.boxes.forEach((box) => this.initializeBox(account, box));
  }

  private initializeBox(account: IMailAccount, box: string) {
    forkJoin(this.httpService.getMailsFromBox(account.email, box, 0), this.getForChangeBuffer.bind(this)())
      .subscribe(results => {
        const mails = {... results[1]};

        mails[account.email] || (mails[account.email] = {});
        mails[account.email][box] = results[0];
        this.mailStorage.next(mails);
      });
  }

  private getForChangeBuffer() {
    return this.mailStorage
      .pipe(take(1));
  }

}
