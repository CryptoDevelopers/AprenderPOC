import React, { Component } from 'react';
import { Badge, Form, FormGroup, FormText, Label, Input, CardFooter, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import axios from 'axios';


class Upload extends Component {
  state = {
    title: '',
    description: '',
  }

  uploadVideo = event => {
    const vid = {
      title: this.state.title,
      description: this.state.description,
    };

    axios.post('http://localhost:8000/video', vid)
      .then(res => {
        console.log("Vid Uploaded");
        // console.log(res);
        // const bal = res.data;
        // this.setState({ balance: bal })
      })
  }

  descriptionChanged = event => {
    this.setState({ description: event.target.value });
  }
  titleChanged = event => {
    this.setState({ title: event.target.value });
  }

  render() {

    return (
      <Card className="mw-700">
        <CardHeader>
          <strong>Video Upload</strong>
        </CardHeader>
        <CardBody>
          <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="file-input">File input</Label>
              </Col>
              <Col xs="12" md="9">
                <Input type="file" id="file-input" name="file-input" />
                {/*<Input type="file" id="file-input" name="file-input" multiple /> */}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="3">
                <Label htmlFor="text-input">Video Title</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={this.titleChanged} type="text" id="text-input" name="text-input" placeholder="Title" />
                <FormText color="muted">Short and sweet!</FormText>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="textarea-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input onChange={this.descriptionChanged} data-role="tagsinput" type="textarea" name="textarea-input" id="textarea-input" rows="4"
                  placeholder="Please describe your video!" />
              </Col>
            </FormGroup>

            {/* TAGS - https://github.com/olahol/react-tagsinput */}

            <FormGroup row hidden>
              <Col md="3">
                <Label className="custom-file" htmlFor="custom-file-input">Custom file input</Label>
              </Col>
              <Col xs="12" md="9">
                <Label className="custom-file">
                  <Input className="custom-file" type="file" id="custom-file-input" name="file-input" />
                  <span className="custom-file-control"></span>
                </Label>
              </Col>
            </FormGroup>
          </Form>
        </CardBody>
        <CardFooter>
          <Button onClick={this.uploadVideo} type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default Upload;
