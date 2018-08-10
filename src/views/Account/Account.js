import React, { Component } from 'react';
import { InputGroup, Input, InputGroupAddon, Table, Badge, Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row, Collapse, Fade, CardImg } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';

class Account extends Component {
  state = {
    buyAmnt: '',
    balance: 0,
  }

  handleChange = event => {
    this.setState({ buyAmnt: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const purchase = {
      buyAmnt: this.state.buyAmnt
    };

    console.log(user.buyAmnt)

    axios.post('http://localhost:8000/balance', { purchase })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  componentDidMount() {
    axios.get('http://localhost:8000/balance')
    .then(res => {
      const bal = res.data;
      this.setState({balance: bal})
    })
  }

  render() {
    return (
      <div className="animated fadeIn">

        <Card>
          <CardHeader>
            <h2><strong>Account Overview</strong></h2>
          </CardHeader>
          <CardBody>

          <Row>
            <Col md={{ size: 4, offset: 2}}>
              <Card>
              <CardBody>
                <h3>Profile</h3>
                <hr className="my-2"/>
                <h4>Name</h4>
                <p>Mohammed Salah</p>
                <h4>Email</h4>
                <p>msalah@gmail.com</p>
                <h4>Country</h4>
                <p>Egypt</p>
                <h4>Postal code</h4>
                <p>22030</p>
                <Button color="primary">Update Profile</Button>
              </CardBody>
              </Card>
            </Col>
            <Col md={{ size: 4, offset: 0}}>
              <Col>
                <Card className="text-center">
                <CardBody>
                  <h3>PRR balance</h3>
                  <hr className="my-2"/>
                  <h4>$PRR 69.99</h4>
                  <Button color="primary">Refresh</Button>
                </CardBody>
                </Card>
              </Col>
              <Col>
                <Card className="text-center">
                <CardBody>
                  <h3>Purchase more PRR</h3>
                  <hr className="my-2"/>
                  <p>$USD 1 = $PRR 2</p>
                    <InputGroup onChange={this.handleChange}>
                      <Input placeholder="How many $PRR" />
                      <InputGroupAddon addonType="append">$PRR</InputGroupAddon>
                    </InputGroup>
                    <br />
                  <Button onClick={this.handleSubmit} color="success">BUY NOW</Button>
                </CardBody>
                </Card>
              </Col>
            </Col>
          </Row>
            <Row>
              <Col md={{ size: 8, offset: 2}}>
              <Card>
              <CardHeader>
                <h3><strong>Recent Transactions</strong></h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Username</th>
                    <th>Date registered</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr>
                    <td>Samppa Nori</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Estavan Lykos</td>
                    <td>2012/02/01</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="danger">Banned</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Chetan Mohamed</td>
                    <td>2012/02/01</td>
                    <td>Admin</td>
                    <td>
                      <Badge color="secondary">Inactive</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Derick Maximinus</td>
                    <td>2012/03/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="warning">Pending</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td>Friderik Dávid</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr>
                  </tbody>
                </Table>

              </CardBody>
              </Card>
              </Col>
            </Row>
          </CardBody>
        </Card>

      </div>
    )
  }
}

export default Account
