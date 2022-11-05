import React from "react";

class CurrentAccount extends React.Component {
  
  componentDidMount() {
  }

  render() {
    return "Accounts"
  }
}

class AddAnnouncement extends React.Component {
  state = { dataKey: null };
  message = null;
  price = null;

  componentDidMount() {
  }

  add_ann(e) {
    // ADD ANNOUNCEMENT
    const { drizzle, drizzleState } = this.props;
    // var contract = drizzle.contracts.Announcement;
    // console.log(contract);
    // console.log(drizzleState.accounts[0]);
    // const stackId = contract.methods["add"].cacheSend(this.message, this.price, {from: drizzleState.accounts[0]});
    // console.log(stackId);
  }

  msg_onchange(e) {
    this.message = e.target.value;
  }

  price_onchange(e) {
    this.price = e.target.value;
  }

  render(){
    return (
      <div>
        <h1>Add Announcement</h1>
        <textarea onChange={(e) => this.msg_onchange(e)} placeholder="Description" className="input-description"/><br></br>
        <input onChange={(e) => this.price_onchange(e)} type="number" placeholder="Price" className="input-price"/> Wei <br></br>
        <button onClick={() => this.add_ann()} className="submit-button"><b>Submit</b></button>
      </div>
    )
  }

}

class AnnouncementList extends React.Component {
    state = { dataKey: null };
  
    componentDidMount() {
      const { drizzle } = this.props;
      const contract = drizzle.contracts.Announcement;
      const dataKey = contract.methods["list"].cacheCall();
      this.setState({ dataKey });
    }
  
    render() {
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
            <h1>Announcements:</h1>
            {listItems}
          </div>
        );
      }
      return "Loading items...";
    }
  }

export {AnnouncementList, AddAnnouncement, CurrentAccount};