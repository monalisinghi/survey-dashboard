import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import APP_CONFIG from "../config";
import { jsonGet, participation } from "../utils";

function SurveyList() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    jsonGet(`${APP_CONFIG.baseUrl}/surveys`)
      .then((results) => {
        setData(results);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        throw new Error("Error: ", error);
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
              return (
                <Container key={index}>
                  <Row className="mb-3 border rounded py-2">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                      <h4 className="my-2">{survey.name}</h4>
                    </Col>
                    <Col className="text-center">
                      <small>Participants</small>
                      <p className="m-0">
                        <strong>{survey.participant_count}</strong>
                      </p>
                    </Col>
                    <Col className="text-center">
                      <small>Responses</small>
                      <p className="m-0">
                        <strong>{survey.submitted_response_count}</strong>
                      </p>
                    </Col>
                    <Col className="text-center">
                      <small>Participation %</small>
                      <p className="m-0">
                        <strong>{participation(survey.response_rate)}</strong>
                      </p>
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

export default SurveyList;
