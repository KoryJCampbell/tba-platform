const { json, send } = require("micro");
const stripe = require("stripe")(process.env.STRIPE_SECRET_DEV);
const axios = require("axios");

const dispatchTicket = (token, quantity) => {
  const headers = {
    Authorization: "Token " + process.env.GUEST_PASS_KEY,
    "Content-Type": "application/json"
  };
  var tickets = []
  for (var i = 0;i<quantity;i++){
    var tix =  axios({
      method: "post",
      url: "https://app.guestmanager.com/api/public/v2/tickets",
      data: {
        ticket: {
          event_ticket_type_id: 26926,
          name: token.card.name,
          email: token.email,
          dispatch: true
        }
      },
      headers: headers
    }).then((ticket)=>{
      console.log(ticket.data)
    }).catch((err)=>{
      console.log(err)
    })
    tickets.push(tix)
  }
  return Promise.all(tickets)
};
const stripeChargeCallback = (res, token, quantity) => async (err, charge) => {
  if (err) {
    console.log(err)
    send(res, 500, { error: err });
  } else {
    // TODO: handle flow of dispatch ticket failing
    // console.log(token)
    // await dispatchTicket(token, quantity);
    send(res, 200, { success: charge, token: token });
  }
};
const ticketApi = async (req, res) => {
  const data = await json(req);
  console.log(data)
  const body = {
    source: data.token.id,
    amount: data.amount,
    currency: "usd",
    metadata: data.metadata
  };
  stripe.charges.create(body, stripeChargeCallback(res, data.token, data.quantity));
};

module.exports = ticketApi;
