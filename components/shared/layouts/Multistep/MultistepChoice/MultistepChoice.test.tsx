import React from "react";
import { render } from "@testing-library/react";

import { MultistepChoice } from "./MultistepChoice";

describe("Multiple Choice Test", () => {
  it("Test if disabled multitstep choice rendered correctly", () => {
    const { getByTestId } = render(
      <MultistepChoice disabled={true} isSelected={false} />
    );

    const parent = getByTestId("choice-element");
    expect(parent).toBeInTheDocument();
    expect(parent).toHaveAttribute("class", "choice choice--disabled");

    const name = getByTestId("choice-name");
    expect(name).toHaveAttribute("style", "color: gray;");

    const description = getByTestId("choice-desc");
    expect(description).toHaveAttribute("style", "color: gray;")
    
  });

  it("Test if enabled multistep choice rendered correctly", () => {
    const { getByTestId } = render(
        <MultistepChoice disabled={false} isSelected={false} />
      );
  
      const parent = getByTestId("choice-element");
      expect(parent).toBeInTheDocument();
      expect(parent).toHaveAttribute("class", "choice ");
  
      const name = getByTestId("choice-name");
      expect(name).toHaveAttribute("style", "color: rgb(61, 101, 216);");
  
      const description = getByTestId("choice-desc");
      expect(description).toHaveAttribute("style", "color: rgba(49, 81, 173, 0.7);")
  })
});
