import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from './Title';
import { CircularProgress } from '@mui/material';
import { ApartmentsList } from './ApartmentsList';

class ApartmentsForSale extends ApartmentsList {
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
    let listItems = this.getList(function (d) { return d.sold !== true; });

    return (
      <React.Fragment>
        <Title>Apartments for sale</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='center'>Location</TableCell>
              <TableCell align='center'>Price [ETH]</TableCell>
              <TableCell align='center'>Seller</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listItems.map((entry) => (
              <TableRow key={entry.index}>
                <TableCell>
                  <Button onClick={() => this.buy(entry.index)} variant="outlined">Buy</Button>
                </TableCell>
                <TableCell align='center'>{entry.apartment.location}</TableCell>
                <TableCell align='center'>{this.getPriceInEth(entry.apartment.price)}</TableCell>
                <TableCell align='center'>{entry.apartment.seller}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export {ApartmentsForSale};
