import React from "react";
import { render, cleanup } from "@testing-library/react";
import Component from "./QuestionTable";

const createComponent = (questions) => {
  return render(<Component questions={questions} />);
};

afterEach(cleanup);

describe("Question Table component", () => {
  it("should render correctly", () => {
    const mockQuestions = [
      {
        description: "I like the kind of work I do.",
      },
      {
        description: "We are working at the right pace to meet our goals.",
      },
    ];
    const { getByTestId, getAllByTestId } = createComponent(mockQuestions);
    expect(getByTestId("questionTable")).toBeVisible();
    expect(getAllByTestId("question").length).toEqual(2);
    expect(getAllByTestId("rating").length).toEqual(2);
  });

  it("should not display questionTable if no data is provided", () => {
    const mockQuestions = [];
    const { queryByTestId, getByTestId } = createComponent(mockQuestions);
    expect(queryByTestId("question")).not.toBeInTheDocument();
    expect(queryByTestId("rating")).not.toBeInTheDocument();
    expect(getByTestId("question-alert")).toBeVisible();
    expect(getByTestId("question-alert")).toHaveTextContent(
      "Something went wrong, please try again later."
    );
  });
});
