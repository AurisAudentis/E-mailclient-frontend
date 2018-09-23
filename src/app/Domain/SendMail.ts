export interface sendmail {
  from?: string,
  sender?: string,
  to?: string,
  cc?: string,
  bcc?: string,
  replyTo?: string,
  inReplyTo?: string,
  subject?: string,
  text?: string,
  html?: string,
}
