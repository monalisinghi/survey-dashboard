import React from "react";
import { questionRating } from "../utils";

export default function QuestionRow({ description, responses }) {
  return (
    <tr>
      <td data-testid="question">{description}</td>
      <td className="text-center" data-testid="rating">
        {questionRating(responses)}
      </td>
    </tr>
  );
}
