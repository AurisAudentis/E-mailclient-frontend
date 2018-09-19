
interface AddressObject {
  value: EmailAddress[];
  html: string;
  text: string;
}
interface EmailAddress {
  address: string;
  name: string;
}
export interface IMail {
  mailbox: string;
  recip: string;
  mailid: number;
  email: {
    subject: string;
    date: Date;
    from: AddressObject;
    to: AddressObject;
    message: string;
    unread: boolean;
    flags?: string[];
  };

}

export const mailComparator = (mail1, mail2) => +new Date(mail2.email.date) - +new Date(mail1.email.date);

export const mailIsEqual = (mail1, mail2) => JSON.stringify(mail1) === JSON.stringify(mail2);
