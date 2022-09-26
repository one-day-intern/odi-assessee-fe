interface CompanySignupStepsState {
  forms: MultistepForm[];
  selectedId: number;
  selectStep: (id: number) => void;
  lastEnabledInd: number;
}
