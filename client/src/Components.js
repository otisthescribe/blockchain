import React from "react";
/* global BigInt */

class Components extends React.Component {
  state = { dataKey: null };
  message = null;
  price = null;
  current_account = null;
  selected_item = null;
  items = null;
  gas_price = null;
  current_balance = null;
  refund_item = null;
  
  componentDidMount() {
    // Called once on component loading
    const { drizzle, drizzleState } = this.props;
    const contract = drizzle.contracts.Announcement;
    // Set the account to first from the MetaMask list
    // this.current_account = drizzleState.accounts[0];
    // this.current_balance = drizzleState.accountBalances[this.current_account];
    // Set continuous data synchronization from list method
    const dataKey = contract.methods["list"].cacheCall();
    this.setState({ dataKey });
    this.gas_price = 10000000;
  }

  add_ann(e) {
    // ADD ANNOUNCEMENT
    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Announcement;
    const stackId = contract.methods.add.cacheSend(this.message, this.price, {from: this.current_account, gas: this.gas_price});
  }

  buy_item(e) {
    // BUY AN ITEM
    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Announcement;
    const stackId = contract.methods.pay.cacheSend(this.selected_item, {from: this.current_account, value: this.items[this.selected_item]["price"], gas:this.gas_price});
  }

  refund_money() {
    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Announcement;
    const stackId = contract.methods.refund.cacheSend(this.refund_item, {from: this.current_account, value: this.items[this.refund_item]["price"], gas:this.gas_price});
  }

  refresh_items_list() {
    const { drizzle, drizzleState } = this.props;
    const { Announcement } = this.props.drizzleState.contracts;
    const AnnList = Announcement.list[this.state.dataKey];

    if (typeof(AnnList) == "object"){
      this.items = AnnList.value;
      let listItems = Array();
      let soldItems = Array();
      for (let i = 0; i < this.items.length; i++) {
        let d = this.items[i]
        if (d.sold == true){
          soldItems.push(<p key={i} className="item-sold">{i}. {d.name} for {d.price} Wei</p>)
        }
        else {
          listItems.push(<p key={i}> {i}. {d.name} for {d.price} Wei</p>)
        }
      }
    }
  }

  render() {
    const { drizzle, drizzleState } = this.props;
    const { Announcement } = this.props.drizzleState.contracts;
    const AnnList = Announcement.list[this.state.dataKey];
    // Set the account to currently selected in MetaMask
    this.current_account = drizzleState.accounts[0];
    this.current_balance = drizzleState.accountBalances[this.current_account];


    if (typeof(AnnList) == "object"){
      this.items = AnnList.value;
      let listItems = Array();
      let soldItems = Array();
      let refundedItems = Array();
      for (let i = 0; i < this.items.length; i++) {
        let d = this.items[i]
        console.log(this.items[i])
        if (d.refunded == true){
          refundedItems.push(<p key={i}>{i}. {d.name} for {d.price} Wei</p>);
        }
        else if (d.sold == true) {
          soldItems.push(<p key={i}>{i}. {d.name} for {d.price} Wei</p>);
        }
        else {
          listItems.push(<p key={i}> {i}. {d.name} for {d.price} Wei</p>)
        }
      }
      return (
        <div>
          <div className="contract-methods">
            <div className="account-name">
              <h1>Current account: </h1>
              <p>ADDRESS: {this.current_account}</p>
              <p>BALANCE: {this.current_balance} Wei</p>
              <p style={{color: 'gray', fontSize: 11, fontStyle: "italic"}}>If this information is not correct, try refreshing the page.</p>
            </div>

            <div className="add-announcement">
              <h1>Add Announcement</h1>
              <textarea onChange={(e) => this.message = e.target.value} placeholder="Description" className="input-description"/><br></br>
              <input onChange={(e) => this.price = BigInt(e.target.value)} type="number" placeholder="Price" className="input-price"/> Wei <br></br>
              <button onClick={() => this.add_ann()} className="submit-button"><b>Submit</b></button>
            </div>

            <div className="buy-item">
              <h1>Buy product</h1>
              <input onChange={(e) => this.selected_item = BigInt(e.target.value)} type="number" placeholder="Item's index" className="input-price"/> <br></br>
              <button onClick={() => this.buy_item()} className="pay-button"><b>Pay and buy</b></button>
            </div>

            <div className="refund-item">
              <h1>Refund</h1>
              <input onChange={(e) => this.refund_item = BigInt(e.target.value)} type="number" placeholder="Item's index" className="input-price"/> <br></br>
              <button onClick={() => this.refund_money()} className="pay-button"><b>Refund</b></button>
            </div>
          </div>

          <div className="list-of-items">
            <h1>Available items: </h1>
            {listItems.length == 0 && <p> Nothing to show here </p> }
            {listItems.length > 0 && <div> {listItems} </div>}

            <h1>Sold items: </h1>
            {soldItems.length == 0 && <p> Nothing was sold (and not refunded) yet</p> }
            {soldItems.length > 0 && <div> {soldItems} </div>}

            <h1>Refunded items: </h1>
            {refundedItems.length == 0 && <p> Nothing was refunded yet </p> }
            {refundedItems.length > 0 && <div> {refundedItems} </div>}
          </div>

        </div>
      );
    }
    return "Loading items...";
  }
}

export {Components};