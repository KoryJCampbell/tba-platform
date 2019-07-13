import React, { Component } from 'react';
import { Button, ButtonDropdown, CardColumns, CardHeader, Card, CardBody, CardFooter,Dropdown,DropdownMenu, DropdownToggle, DropdownItem, DropdownItemProps, FormGroup, Label,ListGroupItem, ListGroup, FormText, Badge,Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { Bar, Doughnut, Line, Pie, Polar, Radar } from 'react-chartjs-2';

class MyEvents extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: new Array(19).fill(false),
    };
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
    this.setState({
      dropdownOpen: newArray,
    });
  }
  render() {
    return (
      <div className="animated fadeIn">
      <Row>
        <Col>
          <h5>Current Events</h5>
          <ListGroup>
          <ListGroupItem className="justify-content-between">Crank Karaoke
              <ButtonDropdown className="float-right" isOpen={this.state.dropdownOpen[0]} toggle={() => { this.toggle(0); }}>
                <DropdownToggle caret>
                  Manage
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem href="#/manage">Manage</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem href="#/event/342">View</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ListGroupItem>
          </ListGroup>
          <br />
          <h5>Event Drafts</h5>
          <ListGroup>
            <ListGroupItem className="justify-content-between">Crank Comedy
              <ButtonDropdown className="float-right" isOpen={this.state.dropdownOpen[1]} toggle={() => { this.toggle(1); }}>
                <DropdownToggle caret>
                  Manage
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Manage</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>View</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ListGroupItem>
          </ListGroup>
          <br />
          <h5>Past Events</h5>
          <ListGroup>
          <ListGroupItem className="justify-content-between">Chicken & Mumbo Sauce
              <ButtonDropdown className="float-right" isOpen={this.state.dropdownOpen[2]} toggle={() => { this.toggle(2); }}>
                <DropdownToggle caret>
                  Manage
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Manage</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>View</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ListGroupItem><ListGroupItem className="justify-content-between">Clock Out Thursday
              <ButtonDropdown className="float-right" isOpen={this.state.dropdownOpen[3]} toggle={() => { this.toggle(3); }}>
                <DropdownToggle caret>
                  Manage
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Manage</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>View</DropdownItem>
                </DropdownMenu>
              </ButtonDropdown>
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
    </div>
    
    );
  }
}

export default MyEvents;
