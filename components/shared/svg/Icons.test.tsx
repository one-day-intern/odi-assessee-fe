import React from "react";
import Avatar from "./Avatar";
import ErrorIcon from "./ErrorIcon";
import FileIcon from "./FileIcon";
import FileUploadingIcon from "./FileUploadIcon";
import { OdiLogo } from "./OdiLogo";
import RefreshIcon from "./RefreshIcon";
import SearchIcon from "./SearchIcon";
import TrashIcon from "./TrashIcon";
import { render } from "@testing-library/react";

describe("Icon component test suite", () => {
    test("testing avatar icon", () => {
        render(<Avatar />)
    })
    test("testing error icon", () => {
        render(<ErrorIcon />)
    })
    test("testing File icon", () => {
        render(<FileIcon />)
    })
    test("testing File uploading icon", () => {
        render(<FileUploadingIcon />)
    })
    test("testing odi icon", () => {
        render(<OdiLogo />)
    })
    test("testing refresh icon", () => {
        render(<RefreshIcon />)
    })
    test("testing Search icon", () => {
        render(<SearchIcon />)
    })
    test("testing trash icon", () => {
        render(<TrashIcon />)
    })
})