import React from "react";
import { Table, Alert } from "react-bootstrap";
import QuestionRow from "./QuestionRow";

export default function QuestionTable({ questions }) {
  return questions && questions.length > 0 ? (
    <Table
      bordered
      hover
      responsive
      style={{ marginTop: "-1px" }}
      data-testid="questionTable"
    >
      <thead>
        <tr>
          <th>Question</th>
          <th style={{ width: "2rem" }}>Rating</th>
        </tr>
      </thead>

      <tbody>
        {questions.map((question, index) => (
          <QuestionRow
            key={index}
            description={question.description}
            responses={question.survey_responses}
          />
        ))}
      </tbody>
    </Table>
  ) : (
    <Alert variant="danger" data-testid="question-alert">
      Something went wrong, please try again later.
    </Alert>
  );
}
