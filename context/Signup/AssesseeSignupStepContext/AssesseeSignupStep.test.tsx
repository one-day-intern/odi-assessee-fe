import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { AssesseeSignupStepProvider, useAssesseeSignupStepContext } from "./index";

const MockCSSPChildren = () => {
    
    const { selectStep, selectedId, lastEnabledInd } = useAssesseeSignupStepContext();

    return <div>
        <p data-testid="selectedId">{ selectedId }</p>
        <p data-testid="lastEnabledInd">{ lastEnabledInd }</p>
        <button data-testid="inc" onClick={ () => selectStep(2)}></button>
        <button data-testid="dec" onClick={ () => selectStep(1)}></button>
    </div>
}

describe("Company Signup Step Context Test", () => {
    beforeEach(() =>
      render(
        <AssesseeSignupStepProvider>
            <MockCSSPChildren/>
        </AssesseeSignupStepProvider>
      )
    );
  
    it("Test if selectedId returns correct value", () => {
      const selectedId = screen.getByTestId("selectedId");
      expect(selectedId).toHaveTextContent(/1/g);
    });

    it("Test if selectStep is handled correctly", () => {
        const incElement = screen.getByTestId("inc");
        fireEvent.click(incElement);

        const selectedId = screen.getByTestId("selectedId");
        expect(selectedId).toHaveTextContent(/2/g);

        const lastEnabledForm = screen.getByTestId("lastEnabledInd");
        expect(lastEnabledForm).toHaveTextContent(/2/g);

        const decElement = screen.getByTestId("dec");
        fireEvent.click(decElement);

        expect(selectedId).toHaveTextContent(/1/g);
        expect(lastEnabledForm).toHaveTextContent(/2/g);

    });
  
    
  });