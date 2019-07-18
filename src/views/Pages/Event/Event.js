import React, { Component, lazy } from 'react';
import update from 'immutability-helper';
import axios from 'axios'
import { Button, Card, CardBody, Container, Col,Fade, Media, ListGroup, ListGroupItem, ListGroupItemText,ListGroupItemHeading,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, Table, UncontrolledDropdown } from 'reactstrap';const StripeCheckout = lazy(() => import('../../Widgets/StripeCheckout'))
class Event extends Component {  
  constructor(props) {
  super(props);

  this.state = {
    isOpen: false,
    isEventFetched: true,
    collapse: false,
    gaCount: 0,
    quantity:0,
    eventId: 342,
    eventType: "",
    total: 0,
    event: {
      createdAt: "2019-07-20T04:00:00.000Z",
      description: "Over the past ten years through ground-breaking collaborations with the likes of Jay-Z, Kanye West and Kendrick Lamar to name a few, the Louisiana native has built an undeniable legacy in the ruthless world of hip-hop. His heavy-weight flow packs a viciously memorable punch, yet it's the man's versatility that sets him apart from the rest with his ability to hammer a Just Blaze beat just as impressive as his dreamy collaborations with Ceelo Green and Erykah Badu, or his mind-blowing verse on Chance The Rapper's Coloring Book. \n\n Presented by Freshly Breemed.\n\n This is a 21+ event (under 18s must be accompanied by an adult)",
      endDate: "2019-07-20T12:00:00.000Z",
      startDate: "2019-07-20T14:00:00.000Z",
      image: {
        cdnUri: "https://chickenandmumbosauce.com/static/img/930-recap/IMG_8163.jpg",
        files: [""]
      }, 
      location: {
        name: "9:30 Club",
        address: {
          streetAddress: "815 V St NW ",
          city: "Washington",
          state: "DC",
          postalCode: 20002
        }
      },
      organizer: {
        name: "Mumbo Boys"
      },
      refundable: true,
      tags: "fun, cheeks",
      ticketTypes: {
        GA: {name: "GA", type: "paid", count: 0, price: 15, fees: 2.45, }
      },
      title: "Chicken & Mumbo Sauce",
      user: "user",
      _id: "de3f55",
      doorTime: "2019-07-02T04:00:00.000Z",
      eventStatus: "active",

    },
    fadeIn: false
  };
  this.toggle = this.toggle.bind(this);
  this.handleDecrement = this.handleDecrement.bind(this)
  this.handleIncrement = this.handleIncrement.bind(this)
  this.handleChange = this.handleChange.bind(this)
  this.getTotal = this.getTotal.bind(this)
  this.getTime = this.getTime.bind(this)
}
//   componentDidMount() {
//     axios.get(`/idk`)
//       .then(res => {
//         console.log(res)
//         const event = res.data[1];
//         this.setState({ 
//           event,
//           isEventFetched: true,
//          },()=>console.log(this.state));
//       })
//   }


  getTotal(){
    let total = 0;
    for (var ticket in this.state.event.ticketTypes){
      ticket = this.state.event.ticketTypes[ticket]
      console.log(ticket)
      total = total + ticket.count* (ticket.price+ticket.fees)
    }
    this.setState({total})
  }
  handleIncrement(e, type) {
    let ticketUpdate = this.state.event.ticketTypes
    ticketUpdate[type].count ++;
    this.getTotal()
    this.setState({ 
      ticketTypes: ticketUpdate,
      quantity: this.state.quantity +1,
      fadeIn: true
    })
  }
  handleDecrement(e, type) {
    let ticketUpdate = this.state.event.ticketTypes
    if (ticketUpdate[type].count >= 1){
      ticketUpdate[type].count --;
      this.getTotal()
      this.setState({ 
        ticketTypes: ticketUpdate,
        quantity: this.state.quantity -1
      })
    }
  }
  handleChange(e , another) {
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  getTime(datetime){
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var dateTime = new Date(datetime)
    var day = days[dateTime.getDay()];
    var hr = dateTime.getHours();
    var min = dateTime.getMinutes();
    if (min < 10) {
        min = "0" + min;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    var date = dateTime.getDate();
    var month = months[dateTime.getMonth()];
    var year = dateTime.getFullYear();
    return day + " " + month + " "+ date+ " "+hr + ":" + min + ampm ;
  }
  render() {
    let tickets, event;
    if (this.state.isEventFetched) {
      event = this.state.event
      tickets = 
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
                value={this.state.event.ticketTypes["GA"].count}  
                onChange={(e) => this.handleChange(e, "ga")} />
              <span onClick={(e) => this.handleIncrement(e,"GA")}>+</span>
            </div> 
          </td>
        </tr>
      </tbody>
    } else {
      tickets =  ''
    }

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
        <div className="app align-items-center">
          {/* <Container> */}
            <Jumbotron>
              <Media width="100%" src={this.state.isEventFetched? event.image.cdnUri:'' }/>
              <br />
              <h1>{this.state.isEventFetched ? event.title:'Chicken & Mumbo Sauce' }</h1> 
              <Collapse isOpen={this.state.collapse}>                      
                <h4>Tickets</h4>
                <Card>
                  <Table hover responsive className="table-outline mb-0 d-sm-table">
                    <thead className="thead-light">
                      <tr>
                        <th className="text-center">Ticket Type</th>
                        <th>Price</th>
                        <th className="text-center">Quantity</th>
                      </tr>
                    </thead>
                    {tickets}
                  </Table>
                </Card>
              </Collapse>
              <br />
              <Row>
                <Col>
                  {this.state.isEventFetched?  event.description.split("↵").map((i,key) => { return <p key={key}>{i}</p> }) : ""}
                </Col>
                <Col>
                  <p> 
                    <i className="icon-location-pin icons font-2x lmt-4"></i>
                    <div>{this.state.isEventFetched? event.location.name : ''}</div>
                    <p className="text-muted">{this.state.isEventFetched? event.location.address.streetAddress: ''}<br />Washington, DC 20001</p>
                  </p>
                  <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted">{this.state.isEventFetched? this.getTime(event.startDate) + " to " + this.getTime(event.endDate): ''} </p></p>
                  <div>$15.00</div>
                  <div className="text-muted">{this.state.isEventFetched? (event.refundable? "Refundable": "No refunds. All sales are final") : ""} </div>
                  <hr className="my-2" />
                  <Button color="secondary" size="lg" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Tickets</Button>
                  <Fade in={this.state.fadeIn && this.state.collapse && this.state.quantity > 0} tag="h5" className="mt-3">
                    {/* <Button color="success" size="lg" style={{ marginBottom: '1rem' }}>Checkout</Button> */}
                    <div>Total: ${this.state.total.toFixed(2)}</div>
                    <StripeCheckout metadata={{ticketType: event.ticketTypes, total: this.state.total}}/>
                  </Fade>
                </Col>
              </Row>
            </Jumbotron>
          {/* </Container> */}
        </div>
      </div>
    );
  }
}

export default Event;
