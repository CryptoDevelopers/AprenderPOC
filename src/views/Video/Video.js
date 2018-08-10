import React, { Component } from 'react';
import { Badge, Form, Progress, FormGroup, FormText, Label, Input, CardFooter, Button, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';
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
            <strong>ReactJS Basics - #1 What is React?</strong>
          </CardHeader>
          <CardBody>
              <YouTube
                videoId="JPT3bFIwJYA"
                opts={opts}
                onReady={this._onReady}
              />
          </CardBody>
          {/* <CardFooter> */}
            <Table hover responsive className="table-outline mb-0 d-none d-sm-table float-right">
                  {/* <thead className="thead-light">

                  </thead> */}
                    <tbody>
                  <tr>
                    <td className="text-center">
                      <div className="avatar">
                        <img src={'assets/img/avatars/3.jpg'} className="img-avatar pointer" alt="admin@bootstrapmaster.com" />
                        <span className="avatar-status badge-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>Academind</div>
                      <div className="small text-muted">
                        August 8, 2018
                      </div>
                    </td>

                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                          9,322 views
                        </div>
                      </div>
                      <Progress className="progress-xs" color="success" value="100" />
                    </td>
                    <td className="text-center">
                      <img src={'assets/img/ost_icon.png'} className="pointer zoomout" style={{ fontSize: 34 + 'px' }}></img>
                    </td>
                    <td>
                    <Button type="submit" size="sm" color="primary"><i className="fa fa-question-circle"></i> I have a question!</Button>
                    </td>
                  </tr>
                  </tbody>
                </Table>
          {/* </CardFooter> */}

        </Card>
    )
  }
}

export default Video;
