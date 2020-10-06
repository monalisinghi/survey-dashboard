import React, { useEffect, useState } from "react";
import { Spinner, Alert, Tabs, Tab, Badge } from "react-bootstrap";
import APP_CONFIG from "../config";
import { participation } from "../utils";
import QuestionTable from "./QuestionTable";

export default function SurveyDetails({ id }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${APP_CONFIG.baseUrl}/surveys/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((results) => {
        setData(results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("There has been a problem with fetch operation:", error);
      });
  }, [id]);

  if (isLoading) {
    return <Spinner animation="border" />;
  } else {
    if (data.survey_result_detail) {
      const { themes, name, response_rate } = data.survey_result_detail;
      return (
        <>
          <h2 className="my-4">
            {name}{" "}
            <Badge pill variant="success">
              Participation: {participation(response_rate)}
            </Badge>
          </h2>
          <Tabs id="theme" transition={false}>
            {themes.map((theme, index) => {
              return (
                <Tab eventKey={theme.name} title={theme.name} key={index}>
                  <QuestionTable questions={theme.questions} />
                </Tab>
              );
            })}
          </Tabs>
        </>
      );
    } else {
      return (
        <Alert variant="danger">
          Something went wrong, please try again later.
        </Alert>
      );
    }
  }
}
