import React from 'react';
import DisplayAStock from './DisplayAStock';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  align2: {
    textAlign: 'center',
    flexGrow: 2,
  },
  align1: {
    textAlign: 'center',
    flexGrow: 1,
  },
  spaceHolder: {
    width: '15%',
    paddingRight: 0,
  },
}));
const DisplayStocks = ({ quoteList, deleteStock, newStock }) => {
  const classes = useStyles();
  const style = {
    align: 'center',
  };
  // console.log('DisplayStocks ');
  // console.log(quoteList);

  return (
    <React.Fragment>
      <Table size='small' className='displayStocks'>
        <TableHead>
          <TableRow>
            <TableCell className={classes.spaceHolder}></TableCell>
            <TableCell className={classes.align2}>Symbol</TableCell>
            <TableCell className={classes.align2}>Current Price</TableCell>
            <TableCell className={classes.align2}>% Change</TableCell>
            <TableCell className={classes.align2}>Prev. Closing</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quoteList.map((quote, index) => (
            <DisplayAStock
              key={`${quote.symbol}+${index}`}
              quote={quote}
              deleteStock={deleteStock}
              newStock={newStock}
            />
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
