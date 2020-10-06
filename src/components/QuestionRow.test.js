import React from "react";
import { render, cleanup } from "@testing-library/react";
import Component from "./QuestionRow";

const createComponent = (description, responses) => {
  return render(
    <table>
      <tbody>
        <Component description={description} responses={responses} />
      </tbody>
    </table>
  );
};

afterEach(cleanup);

describe("Question Row component", () => {
  it("should render correctly", () => {
    const mockResponse = [];
    const { getByText, getByTestId } = createComponent(
      "I like the kind of work I do.",
      mockResponse
    );
    expect(getByText("I like the kind of work I do.")).toBeVisible();
  });

  describe("single questions", () => {
    it("should render with rating", () => {
      const mockResponse = [
        {
          response_content: "4",
        },
      ];
      const mockQuestionText = "I like the kind of work I do.";

      const { getByText, getByTestId } = createComponent(
        mockQuestionText,
        mockResponse
      );
      expect(getByText(mockQuestionText)).toBeVisible();
      expect(getByTestId("rating")).toHaveTextContent("4");
    });
  });

  describe("multiple questions", () => {
    it("should render with all ratings", () => {
      const mockResponse = [
        {
          response_content: "4",
        },
        {
          response_content: "3",
        },
        {
          response_content: "5",
        },
        {
          response_content: "2",
        },
      ];
      const mockQuestionText = "I like the kind of work I do.";

      const { getByText, getByTestId } = createComponent(
        mockQuestionText,
        mockResponse
      );
      expect(getByText(mockQuestionText)).toBeVisible();
      expect(getByTestId("rating")).toHaveTextContent("3.5");
    });

    it("should render correctly if ratings are missing", () => {
      const mockResponse = [
        {
          response_content: "",
        },
        {
          response_content: "3",
        },
        {
          response_content: "5",
        },
        {
          response_content: "",
        },
      ];
      const mockQuestionText = "I like the kind of work I do.";

      const { getByText, getByTestId } = createComponent(
        mockQuestionText,
        mockResponse
      );
      expect(getByText(mockQuestionText)).toBeVisible();
      expect(getByTestId("rating")).toHaveTextContent("4");
    });
  });
});
