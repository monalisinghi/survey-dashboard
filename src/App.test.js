import React from "react";
import App from "./App";
import { render } from "@testing-library/react";

describe("App component", () => {
  it("should rendered H1 text content", () => {
    const { getByText } = render(<App />);
    expect(getByText("Dashboard")).toBeInTheDocument();
  });
});
