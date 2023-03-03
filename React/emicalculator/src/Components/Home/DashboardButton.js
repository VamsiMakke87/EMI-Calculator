import React from 'react'
import { Button } from 'react-bootstrap';

const DashboardButton = (props) => {
  return (
    <Button
    variant="info"
    onClick={props.onClick}
    style={{ padding: "2rem 5rem 2rem 5rem",margin:'8%' }}
  >
    {props.buttonText}
  </Button>
  );
}

export default DashboardButton