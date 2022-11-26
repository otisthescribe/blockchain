import * as React from 'react';



const WEIS_IN_ETH = 1000000000000000000;

class ApartmentsList extends React.Component {
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
    const contract = drizzle.contracts.Apartment;
    // Set the account to first from the MetaMask list
    // this.current_account = drizzleState.accounts[0];
    // this.current_balance = drizzleState.accountBalances[this.current_account];
    // Set continuous data synchronization from list method
    const dataKey = contract.methods["list"].cacheCall();
    this.setState({ dataKey });
    // this.gas_price = 10000000;
    this.gas_price = 6721975;
  }

  getList(filterFunc = null) {
    let listItems = [];

    for (let i = 0; i < this.items.length; i++) {
      let d = this.items[i]
      
      if (filterFunc === null) {
        listItems.push({
          'index': i,
          'apartment': d
        });
      } else {
        if (filterFunc(d)) {
          listItems.push({
            'index': i,
            'apartment': d
          });
        }
      }
    }

    return listItems;
  }

  buy(index) {
    let selected_item = index;

    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Apartment;

    const stackId = contract.methods.buy_apartment.cacheSend(
      selected_item,
      {
        from: this.current_account,
        value: this.items[selected_item].price,
        // gas: this.gas_price
      }
    );
  }

  getPriceInEth(price) {
    let ret = price / WEIS_IN_ETH;

    ret = ret.toFixed(2);

    if (ret < 0.01) {
      ret = '< 0.01';
    }

    return ret;
  }
}

export {ApartmentsList};
