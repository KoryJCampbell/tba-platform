import React, { Component, lazy } from 'react';
import update from 'immutability-helper';
import { Button, Card, CardBody, Container, Col,Fade, Media, ListGroup, ListGroupItem, ListGroupItemText,ListGroupItemHeading,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, Table, UncontrolledDropdown } from 'reactstrap';
const StripeCheckout = lazy(() => import('../../Widgets/StripeCheckout'))

class Event extends Component {  
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
          <Collapse isOpen={this.state.collapse}>                      
              <h4>Tickets</h4>
              <Table hover responsive className="table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center">Ticket Type</th>
                    <th>Price</th>
                    <th className="text-center">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <div>General Admission</div>
                      <div className="small text-muted">
                        <span>One (1) Drink Ticket</span> 
                      </div>
                    </td>
                    <td>
                      <div>$15 </div>
                      <div className="small text-muted">
                        <span>+ 2.45 Fee</span> 
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="ticket-quantity-input">
                        <span onClick={(e) => this.handleDecrement(e,"GA")}>-</span>
                          <input class="quantity" type="text" 
                          value={this.state.ticketsTypes["GA"].count}  
                          onChange={(e) => this.handleChange(e, "ga")} />
                        <span onClick={(e) => this.handleIncrement(e,"GA")}>+</span>
                      </div> 
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Collapse>
            <br />
          <Row>
            <Col>
              <p>Over the past ten years through ground-breaking collaborations with the likes of Jay-Z, Kanye West and Kendrick Lamar to name a few, the Louisiana native has built an undeniable legacy in the ruthless world of hip-hop. His heavy-weight flow packs a viciously memorable punch, yet it's the man's versatility that sets him apart from the rest with his ability to hammer a Just Blaze beat just as impressive as his dreamy collaborations with Ceelo Green and Erykah Badu, or his mind-blowing verse on Chance The Rapper's Coloring Book.
                <br /> <br /> Presented by Freshly Breemed.
                <br /><br />  This is a 21+ event (under 18s must be accompanied by an adult).</p>
          </Col>
          <Col>
            <p> 
              <i className="icon-location-pin icons font-2x lmt-4"></i>
              <div>9:30 Club</div>
              <p className="text-muted">815 V St NW <br />Washington, DC 20001</p>
            </p>
            <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted"> Doors open at 10pm </p></p>
            <div>$15.00</div>
            <div className="text-muted">No refunds. All sales are final </div>
            <hr className="my-2" />
            <Button color="secondary" size="lg" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Tickets</Button>
            <Fade in={this.state.fadeIn && this.state.collapse && this.state.quantity > 0} tag="h5" className="mt-3">
              {/* <Button color="success" size="lg" style={{ marginBottom: '1rem' }}>Checkout</Button> */}
              <div>${this.state.total}</div>
              <StripeCheckout metadata={{ticketType: this.state.ticketsTypes, total: this.state.total}}/>

            </Fade>
          </Col>
          </Row>
        </Jumbotron>

        </Container>
      </div>
      </div>
    );
  }
}

export default Event;
