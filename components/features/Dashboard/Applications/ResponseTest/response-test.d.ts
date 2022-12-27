interface Email {
  id: string;
  additional_info: {
    sender: string,
    subject: string,
    prompt: string,
  }
  released_time: string;
  receivedOn: Date;
}

interface EmailPost {
  'assessment-event-id': string;
  'assessment-tool-id': string;
  subject: string;
  response: string;
}

interface EmailResponse {
  tool_attempt_id: string;
  submitted_time: string;
  responseTime: Date;
  subject: string;
  response: string;
}
