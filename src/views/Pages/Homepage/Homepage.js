import React, { Component } from 'react';
import { Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row, Collapse, Fade, CardImg } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

const options = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips
  },
  maintainAspectRatio: false
};

const bgImage = '/assets/img/edvirtual2.jpg'

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  toggleFade() {
    this.setState((prevState) => { return { fadeIn: !prevState }});
  }

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
        <Row>
        <Col xs="12" sm="6" md="3">
          <Card className="text-white bg-warning">
            <CardImg top width="100%" src="/assets/img/python.jpeg" alt="Card image cap" />
            <CardHeader>
              Applied Data Science with Python Specialization
            </CardHeader>
            <CardBody>
            The 5 courses in this University of Michigan specialization introduce learners to data science through the python
programming language. This skills-based specialization is intended for learners who have basic a python or programming
background, and want to apply statistical, machine learning, information visualization, text analysis, and social network
analysis techniques through popular python toolkits such as pandas, matplotlib, scikit-learn, nltk, and networkx to gain
insight into their data.
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="3">
          <Card className="text-white bg-danger">
            <CardImg top width="100%" src="/assets/img/home.jpeg" alt="Card image cap" />
            <CardHeader>
              Cómo autoconstruir tu vivienda
            </CardHeader>
            <CardBody>
            Aprenderás  las bases y los procedimientos precisos paso a paso para que puedas llevar a cabo la autoconstrucción de una vivienda básica, segura y económica para ti y tu familia; también te será de gran utilidad si estás buscando aprender a reparar,  mejorar la estructura de tu vivienda e incluso si buscas autoemplearte.
¡Atrévete a mejorar tus habilidades en un tema que es siempre útil y necesario!
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="3">
          <Card className="text-white bg-info">
            <CardImg top width="100%" src="/assets/img/blockchain.jpeg" alt="Card image cap" />
            <CardHeader>
              Blockchain Specialization
            </CardHeader>
            <CardBody>
              This specialization introduces blockchain, a revolutionary technology that enables peer-to-peer transfer of digital assets without any intermediaries, and is predicted to be just as impactful as the Internet. More specifically, it prepares learners to program on the Ethereum blockchain. The four courses provide learners with (i) an understanding and working knowledge of foundational blockchain concepts, (ii) a skill set for designing and implementing smart contracts, (iii) methods for developing decentralized applications on the blockchain, and (iv) information about the ongoing specific industry-wide blockchain frameworks.
            </CardBody>
          </Card>
        </Col>
        <Col xs="12" sm="6" md="3">
          <Fade timeout={this.state.timeout} in={this.state.fadeIn}>
            <Card>
              <CardImg top width="100%" src="/assets/img/digmarketing.png" alt="Card image cap" />

              <CardHeader onClick={this.toggle}>
              Digital Marketing Specialization
              </CardHeader>
              <Collapse isOpen={this.state.collapse} id="collapseExample">
                <CardBody>
                  Master strategic marketing concepts and tools to address brand communication in a digital world.
                </CardBody>
              </Collapse>
            </Card>
          </Fade>
        </Col>
      </Row>
      </div>
    );
  }
}

export default Homepage
