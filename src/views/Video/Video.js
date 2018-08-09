import React, { Component } from 'react';
import { Badge, Form, FormGroup, FormText, Label, Input, CardFooter, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
import YouTube from 'react-youtube';



class Video extends Component {

  render() {

    const opts = {
      height: '375',
      width: '620',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
        <Card className="card-vid">
          <CardHeader>
            <strong>Lesson 1</strong>
          </CardHeader>
          <CardBody>
              <YouTube
                videoId="2g811Eo7K8U"
                opts={opts}
                onReady={this._onReady}
              />
          </CardBody>
          <CardFooter>
            <Button type="submit" size="sm" color="primary"><i className="fa fa-question-circle"></i> I have a question!</Button>
            <Button type="reset" size="sm" color="danger"><i className="fa fa-ban"></i> Reset</Button>
          </CardFooter>

        </Card>
    )
  }
}

export default Video;
