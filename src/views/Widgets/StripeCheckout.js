import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'

export default class Checkout extends React.Component {
  onToken = (token, addresses) => {
    console.log(this.props.metadata)
    const meta = this.props.metadata.tickets[Object.keys(this.props.metadata.tickets)] + ',' + this.props.metadata.tickets[Object.keys(this.props.metadata.tickets)].count
    // TODO: metadata
    const body = {
        amount: this.props.metadata.total*100,
        token: token
    }
    console.log(body)
    axios.post('/payments', body).then(response => {
        window.location = '/confirmation?email='+response.data.token.email
        console.log(response)
    }).catch(error =>{
        console.log("Payment Error: ", error);
        alert("There was an issue with your payment. Please try again later")
    })
  };

  render() {
    // console.log(process.env)
    return (
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_CLIENT_DEV}
        token={this.onToken}
        amount={this.props.metadata.total*100}
        billingAddress={true}
        description="Chicken & Mumbo Sauce"
        // image="/static/img/graph.png"
        locale="auto"
        name="Crank Karaoke"
      />
    ) 

  }
}