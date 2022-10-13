interface Email {
  id: string;
  subject: string;
  body: string;
  sender: string;
  receivedOn: Date;
}

interface EmailResponse {
  emailId: string;
  userId: string;
  reply: string;
  sentOn: Date;
}
