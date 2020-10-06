import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import APP_CONFIG from "../config";
import { participation } from "../utils";

function SurveyList({ history }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`${APP_CONFIG.baseUrl}/surveys`)
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
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          {data.survey_results &&
            data.survey_results.map((survey, index) => {
              const navigateToSurvey = (history, url) => {
                history.push(url);
              };
              return (
                <Container
                  key={index}
                  className="cursor-pointer"
                  onClick={(e) => navigateToSurvey(history, survey.url)}
                >
                  <Row className="mb-3 border rounded py-2">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                      <h4 className="my-2 text-primary">{survey.name}</h4>
                    </Col>
                    <Col className="text-center">
                      <small>Participants</small>
                      <h5 className="m-0 text-info">
                        <strong>{survey.participant_count}</strong>
                      </h5>
                    </Col>
                    <Col className="text-center">
                      <small>Responses</small>
                      <h5 className="m-0 text-info">
                        <strong>{survey.submitted_response_count}</strong>
                      </h5>
                    </Col>
                    <Col className="text-center">
                      <small>Participation %</small>
                      <h5 className="m-0 text-success">
                        <strong>{participation(survey.response_rate)}</strong>
                      </h5>
                    </Col>
                  </Row>
                </Container>
              );
            })}
          {!data.survey_results && (
            <Alert variant="danger">
              Something went wrong, please try again later.
            </Alert>
          )}
        </>
      )}
    </>
  );
}

export default withRouter(SurveyList);
