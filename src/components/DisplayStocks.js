import React from 'react';
import DisplayAStock from './DisplayAStock';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const DisplayStocks = ({ quoteList, deleteStock }) => {
  const handleDelete = (symbol) => {
    deleteStock(symbol);
  };

  function preventDefault(event) {
    event.preventDefault();
  }

  const useStyles = makeStyles((theme) => ({
    seeMore: {
      marginTop: theme.spacing(3),
    },
  }));

  return (
    <React.Fragment>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>SYmbol</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>% Change</TableCell>
            <TableCell>Prev. Closing</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quoteList.map((quote, index) => (
            <TableRow key={index}>
              <TableCell>{quote.symbol}</TableCell>
              <TableCell>{quote.latestPrice}</TableCell>
              <TableCell>{(quote.changePercent * 100).toFixed(2)}%</TableCell>
              <TableCell>{quote.previousClose}</TableCell>
              <TableCell>X</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default DisplayStocks;

// <div className='stocks'>
// {quoteList.map((quote, index) => (
//   <DisplayAStock key={index} quote={quote} deleteStock={handleDelete} />
// ))}
// </div>
