import React from "react";
import { withRouter } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import SurveyDetails from "./../components/SurveyDetails";

function Survey({ history, match }) {
  const surveyId = match.params.id;

  const navigateToDashboard = () => {
    history.push("/");
  };

  return (
    <React.Fragment>
      <Breadcrumb className="mt-3">
        <Breadcrumb.Item onClick={navigateToDashboard}>
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{surveyId}</Breadcrumb.Item>
      </Breadcrumb>
      <SurveyDetails id={surveyId} />
    </React.Fragment>
  );
}

export default withRouter(Survey);
