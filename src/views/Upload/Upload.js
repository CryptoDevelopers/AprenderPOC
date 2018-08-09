import React, { Component } from 'react';
import { Badge, Form, FormGroup, FormText, Label, Input, CardFooter, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';



class Upload extends Component {

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
              <Input type="text" id="text-input" name="text-input" placeholder="Title" />
              <FormText color="muted">Short and sweet!</FormText>
            </Col>
          </FormGroup>

            <FormGroup row>
              <Col md="3">
                <Label htmlFor="textarea-input">Description</Label>
              </Col>
              <Col xs="12" md="9">
                <Input data-role="tagsinput" type="textarea" name="textarea-input" id="textarea-input" rows="4"
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
          <Button type="submit" size="sm" color="primary"><i className="fa fa-dot-circle-o"></i> Submit</Button>
          <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default Upload;
