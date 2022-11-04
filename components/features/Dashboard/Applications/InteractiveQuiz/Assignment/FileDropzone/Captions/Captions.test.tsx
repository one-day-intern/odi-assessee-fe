import React from "react";
import { render } from "@testing-library/react";
import { ConfirmationCaption } from "./ConfirmationCaption";
import { InitialCaption } from "./InitialCaption";
import { SubmittedCaption } from "./SubmittedCaption";
import { UploadingCaption } from "./UploadingCaption";

describe("Dropzone captions component test suite", () => {
  test("test render Confirmation caption", () => {
    render(
      <ConfirmationCaption
        fileName="hello"
        onCancel={() => {}}
        onContinue={() => {}}
      />
    );
  });
  test("test render Initial caption", () => {
    render(<InitialCaption />);
  });
  test("test render Submitted caption", () => {
    render(<SubmittedCaption fileName="hello" onDownload={() => {}} />);
  });
  test("test render Uploading caption", () => {
    render(<UploadingCaption fileName="hello" progress={0.5} />);
  });
});
