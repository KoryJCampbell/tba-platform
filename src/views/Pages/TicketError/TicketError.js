import React, { Component, lazy } from 'react';
import update from 'immutability-helper';
import { Button, Card, CardBody, Container, Col,Fade, Media, ListGroup, ListGroupItem, ListGroupItemText,ListGroupItemHeading,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, Table, UncontrolledDropdown } from 'reactstrap';
const StripeCheckout = lazy(() => import('../../Widgets/StripeCheckout'))

class TicketError extends Component { 
  render() {

    return (
      <div>
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TBA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
        </Navbar>
        <div className="app flex-row align-items-center">
        <Container>
        <Jumbotron>
          <Media width="100%" src="https://chickenandmumbosauce.com/static/img/930-recap/IMG_8163.jpg"/>
          <br />
          <h1>Chicken & Mumbo Sauce</h1> 
            <br />
            <p className="lead"> Something has failed. We apologoze for the inconvience. Please contact the organizer try again later. </p>
          <Row>
          <Col>
            <p> 
              <i className="icon-location-pin icons font-2x lmt-4"></i>
              <div>9:30 Club</div>
              <p className="text-muted">815 V St NW <br />Washington, DC 20001</p>
            </p>
            <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted"> Doors open at 10pm </p></p>
            <hr className="my-2" />  
            <Button color="secondary" size="lg" style={{ marginBottom: '1rem' }}>Try Again</Button>          
          </Col>
          </Row>
        </Jumbotron>

        </Container>
      </div>
      </div>
    );
  }
}

export default TicketError;
