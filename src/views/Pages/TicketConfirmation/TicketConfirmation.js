import React, { Component, lazy } from 'react';
import update from 'immutability-helper';
import { Button, Card, CardBody, Container, Col,Fade, Media, ListGroup, ListGroupItem, ListGroupItemText,ListGroupItemHeading,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, Table, UncontrolledDropdown } from 'reactstrap';
const StripeCheckout = lazy(() => import('../../Widgets/StripeCheckout'))

class TicketConfirmation extends Component {  
  constructor(props) {
  super(props);

  this.state = {
    isOpen: false,
    collapse: false,
    gaCount: 0,
    quantity:0,
    eventId: 342,
    total: 0, 
    ticketsTypes:  {
      'GA': {
        name: 'GA',
        type: 'paid',
        count: 0,
        price: 15,
        fees: 2.46
      },
      'Last Call':  {
        name: 'Last Call',
        type: 'paid',
        count: 0,
        price: 20,
        fees: 2.65

      }
    },
    fadeIn: false
  };
  this.toggle = this.toggle.bind(this);
  this.handleDecrement = this.handleDecrement.bind(this)
  this.handleIncrement = this.handleIncrement.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.getTotal = this.getTotal.bind(this)
}
  getTotal(){
    let total = 0;
    for (var ticket in this.state.ticketsTypes){
      ticket = this.state.ticketsTypes[ticket]
      console.log(ticket)
      total = total + ticket.count* (ticket.price+ticket.fees)
    }
    this.setState({total})
  }
  handleIncrement(e, type) {
    let ticketUpdate = this.state.ticketsTypes
    ticketUpdate[type].count ++;
    this.getTotal()
    this.setState({ 
      ticketsTypes: ticketUpdate,
      quantity: this.state.quantity +1,
      fadeIn: true
    })
  }
  handleDecrement(e, type) {
    let ticketUpdate = this.state.ticketsTypes
    if (ticketUpdate[type].count >= 1){
      ticketUpdate[type].count --;
      this.getTotal()
      this.setState({ 
        ticketsTypes: ticketUpdate,
        quantity: this.state.quantity -1
      })
    }
  }
  handleChange(e , another) {
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  render() {

    return (
      <div>
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/">TBA</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">Search</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <div className="app flex-row align-items-center">
        <Container>
        <Jumbotron>
          <Media width="100%" src="https://chickenandmumbosauce.com/static/img/930-recap/IMG_8163.jpg"/>
          <br />
          <h1>Chicken & Mumbo Sauce</h1> 
            <br />
            <p className="lead"> Thank you for signing up for Chicken & Mumbo Sauce. Please check your email for confirmation. </p>
          <Row>
          <Col>
            <p> 
              <i className="icon-location-pin icons font-2x lmt-4"></i>
              <div>9:30 Club</div>
              <p className="text-muted">815 V St NW <br />Washington, DC 20001</p>
            </p>
            <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted"> Doors open at 10pm </p></p>
            <hr className="my-2" />            
          </Col>
          </Row>
        </Jumbotron>

        </Container>
      </div>
      </div>
    );
  }
}

export default TicketConfirmation;
