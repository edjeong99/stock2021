import React from 'react';
import DisplayAStock from './DisplayAStock';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const DisplayStocks = ({ quoteList, deleteStock, newStock }) => {
  const style = {
    align: 'center',
  };
  return (
    <React.Fragment>
      <Table size='small' className='displayStocks'>
        <TableHead>
          <TableRow>
            <TableCell align={style.align}></TableCell>
            <TableCell align={style.align}>Symbol</TableCell>
            <TableCell align={style.align}>Current Price</TableCell>
            <TableCell align={style.align}>% Change</TableCell>
            <TableCell align={style.align}>Prev. Closing</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {quoteList.map((quote, index) => (
            <DisplayAStock
              key={quote.symbol}
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
