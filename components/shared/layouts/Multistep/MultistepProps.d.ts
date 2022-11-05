interface MultistepProps {
  elements: MultistepForm[];
  selectedId: number;
  selectStep: (id: number) => void;
}
