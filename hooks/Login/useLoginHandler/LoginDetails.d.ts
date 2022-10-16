interface LoginTextFields {
  email: string;
  password: string;
}

interface LoginDetails extends LoginTextFields {
  remember: boolean;
}
