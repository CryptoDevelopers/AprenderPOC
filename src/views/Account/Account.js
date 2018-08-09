import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row, Collapse, Fade, CardImg } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

class Account extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Card>
              <CardImg top width="100%" src="/assets/img/edvirtual2.jpg" alt="Card image cap" />
              <CardBody>
                <h2>Prendi</h2>
                <p className="lead">La plataforma de aprendizaje online de la era digital.</p>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </div>
    )
  }
}

export default Account
