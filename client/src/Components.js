import React from "react";

class Components extends React.Component {
    state = { dataKey: null };
    message = null;
    price = null;
    current_account = null;
    selected_item = null;
  
    componentDidMount() {
      const { drizzle, drizzleState } = this.props;
      const contract = drizzle.contracts.Announcement;
      console.log(contract);
      console.log(drizzleState.accounts);
      this.current_account = drizzleState.accounts[0];
      const dataKey = contract.methods["list"].cacheCall();
      this.setState({ dataKey });
      
    }

    add_ann(e) {
      // ADD ANNOUNCEMENT
      const { drizzle, drizzleState } = this.props;
      var contract = drizzle.contracts.Announcement;
      console.log(contract);
      console.log(drizzleState.accounts[0]);
      console.log(typeof(this.message), this.message);
      console.log(typeof(this.price), this.price);
      const stackId = contract.methods.add.cacheSend(this.message, this.price, {from: drizzleState.accounts[0]});
      console.log(stackId);
    }

    buy_item(e) {
      // BUY AN ITEM
      const { drizzle, drizzleState } = this.props;
      var contract = drizzle.contracts.Announcement;
      console.log(contract);
      console.log(drizzleState.accounts[0]);
      console.log(typeof(this.message), this.select_item);
      console.log(typeof(this.price), this.price);
      const stackId = contract.methods.add.cacheSend(this.message, this.price, {from: drizzleState.accounts[0]});
      console.log(stackId);
    }
  
    msg_onchange(e) {
      this.message = e.target.value;
    }
  
    price_onchange(e) {
      this.price = parseInt(e.target.value);
    }

    btn_click(e) {
      this.current_account = e.target.value;
    }

    select_item(e) {
      this.select_item = parseInt(e.target.value);
    }
  
    render() {
      const { drizzle, drizzleState } = this.props;
      const { Announcement } = this.props.drizzleState.contracts;
      const AnnList = Announcement.list[this.state.dataKey];


      if (typeof(AnnList) == "object"){
        let items = AnnList.value;
        let listItems = Array();
        for (let i = 0; i < items.length; i++) {
          let d = items[i]
          if (d.sold == true){
            listItems.push(<p key={i} className="item-sold">(SOLD!!!). {d.name} for {d.price} Wei</p>)
          }
          else {
            listItems.push(<p key={i}> {i}. {d.name} for {d.price} Wei</p>)
          }
        }
        return (
          <div>

            <div className="add-announcement">
              <h1>Add Announcement</h1>
              <textarea onChange={(e) => this.msg_onchange(e)} placeholder="Description" className="input-description"/><br></br>
              <input onChange={(e) => this.price_onchange(e)} type="number" placeholder="Price" className="input-price"/> Wei <br></br>
              <button onClick={() => this.add_ann()} className="submit-button"><b>Submit</b></button>
            </div>

            <div className="buy-item">
              <h1>Buy product</h1>
              <input onChange={(e) => this.select_item(e)} type="number" placeholder="Item's index" className="input-price"/> <br></br>
              <button onClick={() => this.buy_item()} className="pay-button"><b>Pay and buy</b></button>
            </div>

            <div className="list-of-items">
              <h1>Announcements:</h1>
              {listItems}
            </div>

          </div>
        );
      }
      return "Loading items...";
    }
  }

export {Components};