import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';
import { CircularProgress } from '@mui/material';


const WEIS_IN_ETH = 1000000000000000000;

class Orders extends React.Component {
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

  buy(index) {
    let selected_item = index;

    const { drizzle, drizzleState } = this.props;
    var contract = drizzle.contracts.Apartment;
    
    console.log('Trying to buy', this.items[selected_item], 'for', this.items[selected_item].price);

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

  render() {
    const { drizzle, drizzleState } = this.props;
    const { Apartment } = this.props.drizzleState.contracts;
    const ApartmentsList = Apartment.list[this.state.dataKey];
    // Set the account to currently selected in MetaMask
    this.current_account = drizzleState.accounts[0];
    this.current_balance = drizzleState.accountBalances[this.current_account];

    if (typeof(ApartmentsList) != "object") {
      return (
        <React.Fragment>
          <Title>Apartments for sale</Title>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell align='center'>
                  <CircularProgress />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell align='center'>
                  Loading
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </React.Fragment>
      )
    }

    this.items = ApartmentsList.value;
    let listItems = Array();
    let soldItems = Array();

    for (let i = 0; i < this.items.length; i++) {
      let d = this.items[i]
      
      console.log(this.items[i])
      
      if (d.sold == true) {
        soldItems.push(d);
      } else {
        listItems.push(d)
      }
    }

    return (
      <React.Fragment>
        <Title>Apartments for sale</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Price [ETH]</TableCell>
              <TableCell>Seller</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button onClick={() => this.buy(index)} variant="outlined">Buy</Button>
                </TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{this.getPriceInEth(item.price)}</TableCell>
                <TableCell>{item.seller}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Title>Apartments sold</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Location</TableCell>
              <TableCell>Price [ETH]</TableCell>
              <TableCell>Seller</TableCell>
              <TableCell>Buyer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {soldItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.location}</TableCell>
                <TableCell>{this.getPriceInEth(item.price)}</TableCell>
                <TableCell>{item.seller}</TableCell>
                <TableCell>{item.buyer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export {Orders};
