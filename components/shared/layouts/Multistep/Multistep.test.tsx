import { fireEvent, render, screen } from "@testing-library/react";
import { Multistep } from "./Multistep";
import React from "react";

const elements = [
  {
    id: 1,
    name: "Your details",
    description: "Input your company details",
    reactElement: () => <div data-testid="1"></div>,
    isSelected: true,
    disabled: false,
  },
  {
    id: 2,
    name: "Your description",
    description: "Describe your company",
    reactElement: () => <div data-testid="2"></div>,
    isSelected: false,
    disabled: true,
  },
];


const mockedFunction = jest.fn();

describe("Multistep Test", () => {
  beforeEach(() => {
    render(
      <Multistep elements={elements} selectedId={1} selectStep={mockedFunction} />
    );
  });

  it("Test if multistep element displays properly", () => {
    const multistep = screen.getByTestId("backdrop");
    expect(multistep).toBeInTheDocument();
  });

  it("Test if step is changed, a function is called", () => {
    const choiceElement = screen.getAllByTestId("choice-element")[0];
    fireEvent.click(choiceElement);

    expect(mockedFunction).toBeCalledTimes(1);

  })
});
