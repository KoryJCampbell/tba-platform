import React, { Component } from 'react';
import { Button, CardColumns, CardHeader, Card, CardBody, CardFooter, FormGroup, Label, FormText, Badge,Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';

class Create extends Component {
  render() {
    return (
      <div className="animated fadeIn">
      <Row>
        <Col xs="12">

        <Card>
          <CardHeader>
            <strong>Create Event</strong>
          </CardHeader>
          <CardBody>
            <Form action="" method="post" encType="multipart/form-data" className="form-horizontal">
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Event Title</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="text-input" name="text-input" />
                  <FormText color="muted">Give it a short distinct name</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Location<Badge>TODO: Google Autocomplete API</Badge></Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="text-input" name="text-input" />
                  <FormText color="muted">Enter venue or address</FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="datetime">Start Date </Label>
                </Col>
                <Col md="3">
                  <Input type="date" id="date-input" name="date-input" placeholder="date" />
                </Col>
                <Col md="3">
                  <Label htmlFor="datetime">Start Time</Label>
                </Col>
                <Col md="3">
                  <Input type="time" id="time-input" name="time-input" placeholder="time" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="datetime">End Date</Label>
                </Col>
                <Col md="3">
                  <Input type="date" id="date-input" name="date-input" placeholder="date" />
                </Col>
                <Col md="3">
                  <Label htmlFor="datetime">End Time</Label>
                </Col>
                <Col md="3">
                  <Input type="time" id="time-input" name="time-input" placeholder="time" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="textarea-input">Event Description</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="textarea" name="textarea-input" id="textarea-input" rows="9"
                          placeholder="Include need-to-know information to make it easier for people to search for your event page and buy tickets once they're there...." />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="text-input">Event Organizer</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="text" id="text-input" name="text-input" />
                  <FormText color="muted"></FormText>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="selectSm">Event Type</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="select" name="select" id="Select">
                    <option value="" selected="selected">Select the type of event</option>
                    <option value="19">Appearance or Signing</option>
                    <option value="17">Attraction</option>
                    <option value="18">Camp, Trip, or Retreat</option>
                    <option value="9">Class, Training, or Workshop</option>
                    <option value="6">Concert or Performance</option>
                    <option value="1">Conference</option>
                    <option value="4">Convention</option>
                    <option value="8">Dinner or Gala</option>
                    <option value="5">Festival or Fair</option>
                    <option value="14">Game or Competition</option>
                    <option value="10">Meeting or Networking Event</option>
                    <option value="100">Other</option>
                    <option value="11">Party or Social Gathering</option>
                    <option value="15">Race or Endurance Event</option>
                    <option value="12">Rally</option>
                    <option value="7">Screening</option>
                    <option value="2">Seminar or Talk</option>
                    <option value="16">Tour</option>
                    <option value="13">Tournament</option>
                    <option value="3">Tradeshow, Consumer Show, or Expo</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label>Ticket Type</Label>
                </Col>
                <Col md="9">
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio1" name="inline-radios" value="option1" />
                    <Label className="form-check-label" check htmlFor="inline-radio1">RSVP</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio2" name="inline-radios" value="option2" />
                    <Label className="form-check-label" check htmlFor="inline-radio2">Paid Ticket</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="radio" id="inline-radio3" name="inline-radios" value="option3" />
                    <Label className="form-check-label" check htmlFor="inline-radio3">Donation</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
        
              <FormGroup row>
                <Col md="3">
                  <Label>Inline Checkboxes</Label>
                </Col>
                <Col md="9">
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox1" name="inline-checkbox1" value="option1" />
                    <Label className="form-check-label" check htmlFor="inline-checkbox1">One</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox2" name="inline-checkbox2" value="option2" />
                    <Label className="form-check-label" check htmlFor="inline-checkbox2">Two</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input className="form-check-input" type="checkbox" id="inline-checkbox3" name="inline-checkbox3" value="option3" />
                    <Label className="form-check-label" check htmlFor="inline-checkbox3">Three</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="file-input">Add event image</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="file-input" name="file-input" />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md="3">
                  <Label htmlFor="file-multiple-input">Slideshow Images</Label>
                </Col>
                <Col xs="12" md="9">
                  <Input type="file" id="file-multiple-input" name="file-multiple-input" multiple />
                </Col>
              </FormGroup>
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
        
        </Col>
      </Row>
    </div>
    
    );
  }
}

export default Create;
