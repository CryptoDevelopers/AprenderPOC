import React, { Component } from 'react';
import { InputGroup, Input, InputGroupAddon, Table, Badge, Button, Card, CardBody, CardHeader, Col, Container, Jumbotron, Row, Collapse, Fade, CardImg } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';

class Account extends Component {
  state = {
    buyAmnt: '',
    balance: 0,
    transactions: [],
    rows: []
  }

  handleChange = event => {
    this.setState({ buyAmnt: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.buyAmnt)

    const purchase = {
      amount: this.state.buyAmnt,
      user_ids: 'b0851935-b08d-4027-ae33-ed35fe6ac0dc'
    };

    console.log(purchase.buyAmnt)

    axios.post('http://localhost:8000/airdrop', purchase)
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  getBalance = event => {
    const user = {
      user_ids: 'b0851935-b08d-4027-ae33-ed35fe6ac0dc'
    };

    axios.get('http://localhost:8000/balances')
      .then(res => {
        console.log("YEYEEEEEEEE");
        console.log(res);
        const bal = res.data;
        this.setState({ balance: bal })
      })

  }

  getLedger = event => {
    const user = {
      user_ids: 'b0851935-b08d-4027-ae33-ed35fe6ac0dc'
    };

    axios.get('http://localhost:8000/ledger')
      .then(res => {
        const ledgers = res.data.ledger;
        console.log(ledgers[0]);

        var rows = [];
        ledgers.forEach(function (ledj) {
          rows.push(
            <tr>
              <td>{ledj.id}</td>
              <td>{ledj.amount}</td>
              <td>{ledj.from_user_id}</td>
              <td>{ledj.from_user_id}</td>
            </tr >
          );
        }.bind(this));

        this.setState({transactions: res.data.ledger})
        this.setState({rows: rows})
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
              <Col md={{ size: 4, offset: 2 }}>
                <Card>
                  <CardBody>
                    <h3>Profile</h3>
                    <hr className="my-2" />
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
              <Col md={{ size: 4, offset: 0 }}>
                <Col>
                  <Card className="text-center">
                    <CardBody>
                      <h3>PRR balance</h3>
                      <hr className="my-2" />
                      <h4>$PRR {this.state.balance}</h4>
                      <Button onClick={this.getBalance} color="primary">Refresh</Button>
                    </CardBody>
                  </Card>
                </Col>
                <Col>
                  <Card className="text-center">
                    <CardBody>
                      <h3>Purchase more PRR</h3>
                      <hr className="my-2" />
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
              <Col md={{ size: 8, offset: 2 }}>
                <Card>
                  <CardHeader>
                    <h3><strong>Recent Transactions</strong></h3>
                    <Button onClick={this.getLedger} color="success">refresh</Button>
                  </CardHeader>
                  <CardBody>
                
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Amount</th>
                          <th>To User ID</th>
                          <th>From User ID</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      
                        {this.state.rows.map(res => <tbody>{res}</tbody>)}
                        {/* {this.rows} */}
                      
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
