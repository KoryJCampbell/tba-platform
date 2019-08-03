import React, { Component, lazy } from 'react';
import axios from 'axios'
import { Button, Card, Col,Fade, Media, ListGroup, ListGroupItem, ListGroupItemText,ListGroupItemHeading,Jumbotron, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Nav, NavItem, NavbarBrand, Collapse, NavLink, NavbarToggler, DropdownMenu, DropdownToggle, Navbar, DropdownItem, Table, UncontrolledDropdown } from 'reactstrap';const StripeCheckout = lazy(() => import('../../Widgets/StripeCheckout'))
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
        GA: {
          fees: 2.45,
          name: "GA",
          price: 15,
          quantity: 0,
          type: "paid"
        },
        RSVP: {
          fees: 0,
          name: "RSVP",
          price: 0,
          quantity: 10,
          type: "rsvp"
        }
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
  componentDidMount() {
    let event;
    console.log(process.env)
    if (process.env.NODE_ENV !== "development") {
      axios.get(`/api/event`)
        .then(res => {
          console.log(res)
          event = res.data[0];
          let ticketTypes = {}
          for (let ticket in event.ticketTypes){
            ticketTypes[ticket] = event.ticketTypes[ticket]
            ticketTypes[ticket].count = 0
          }
          this.setState({ 
            event,
            isEventFetched: true,
          },()=>console.log(this.state));
      })
    } else {
      event = this.state.event
      let ticketTypes = {}
      for (let ticket in event.ticketTypes){
        ticketTypes[ticket] = event.ticketTypes[ticket]
        ticketTypes[ticket].count = 0
      }
      this.setState({ 
        event,
        isEventFetched: true,
      },()=>console.log(this.state));
    }
  }


  getTotal(){
    let total = 0;
    for (var ticket in this.state.event.ticketTypes){
      console.log(ticket)
      console.log(this.state.event.ticketTypes)
      let tix  = this.state.event.ticketTypes[ticket]
      // console.log(total + tix.count* (tix.price+tix.fees))
      total = parseFloat(total + tix.count* (tix.price+tix.fees)).toFixed(2)
    }
    this.setState({total})
  }
  handleIncrement(e, type) {
    let event = this.state.event
    event.ticketTypes[type].count++;
    // console.log("event tix"+ticketUpdate[type].count)
    console.log("event tix"+event.ticketTypes[type].count)
    this.setState((state) => {
      return { 
      event,
      quantity: state.quantity+1,
      fadeIn: true
    }
  }, () => this.getTotal())
  }
  handleDecrement(e, type) {
    let event = this.state.event
    let ticketUpdate = event.ticketTypes
    if (ticketUpdate[type].count >= 1){
      ticketUpdate[type].count --;
      event.ticketTypes = ticketUpdate
      this.getTotal()
      this.setState({ 
        event,
        quantity: this.state.quantity -1
      })
    }
  }
  handleChange(e , another) {
  }
  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  getTime(datetime, mode){
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
    if (date > 3 && date < 21) date = date+ 'th'; 
    switch (date % 10) {
      case 1:  date = date+"st"; break
      case 2:  date = date+ "nd";break
      case 3:  date = date+ "rd";break
      default: break
    }
    var month = months[dateTime.getMonth()];
    var year = dateTime.getFullYear();
    if (mode === 'start')
      return day + " " + month + " "+ date+ " "+hr + ":" + min + ampm ;
    else {
      return hr + ":" + min + ampm 
    }
  }
  render() {
    let event;
    let tickets = [];
    if (this.state.isEventFetched) {
      event = this.state.event
      console.log(this.state)
      for (let ticketType in event.ticketTypes){
        let ticket = event.ticketTypes[ticketType]
        tickets.push(
          <tbody>
            <tr>
              <td className="text-center">
                <div>{ticket.name}</div>
                <div className="small text-muted">
                  <span>One (1) Drink Ticket</span> 
                </div>
              </td>
              <td>
                <div>${ticket.price}</div>
                <div className="small text-muted">
                  <span>+ {ticket.fees} Fee</span> 
                </div>
              </td>
              <td className="text-center">
                <div className="ticket-quantity-input">
                  <span onClick={(e) => this.handleDecrement(e,ticketType)}>-</span>
                    <input class="quantity" type="text" 
                    value={ticket.count}  
                    onChange={(e) => this.handleChange(e, ticketType)} />
                  <span onClick={(e) => this.handleIncrement(e,ticketType)}>+</span>
                </div> 
              </td>
            </tr>
          </tbody>
        )
      } 
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
                    {tickets.map(ticket => ticket)}
                  </Table>
                </Card>
              </Collapse>
              <br />
              <Row>
                <Col>
                  {this.state.isEventFetched?  event.description.split("\n").map((i,key) => { return <p key={key}>{i}</p> }) : ""}
                </Col>
                <Col>
                  <p> 
                    <i className="icon-location-pin icons font-2x lmt-4"></i>
                    <div>{this.state.isEventFetched? event.location.name : ''}</div>
                    <p className="text-muted">{this.state.isEventFetched? event.location.address.streetAddress: ''}<br />Washington, DC 20001</p>
                  </p>
                  <p><i className="icon-clock icons font-2x lmt-4"></i><p className="text-muted">{this.state.isEventFetched? this.getTime(event.startDate, "start") + " to " + this.getTime(event.endDate, "end"): ''} </p></p>
                  <div>{this.state.isEventFetched? '$'+event.ticketTypes[Object.keys(event.ticketTypes)[0]].price +'.00' :''}</div>
                  <div className="text-muted">{this.state.isEventFetched? (event.refundable? "Refundable": "No refunds. All sales are final") : ""} </div>
                  <hr className="my-2" />
                  <Button color="secondary" size="lg" onClick={this.toggle} style={{ marginBottom: '1rem' }}>Tickets</Button>
                  <Fade in={this.state.fadeIn && this.state.collapse && this.state.quantity > 0} tag="h5" className="mt-3">
                    {/* <Button color="success" size="lg" style={{ marginBottom: '1rem' }}>Checkout</Button> */}
                    <div>Total: ${this.state.total}</div>
                    <StripeCheckout metadata={ !event ? {}:{tickets: event.ticketTypes, total: this.state.total}}/>
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
