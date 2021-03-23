import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Delete } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';

const DisplayAStock = ({ quote, deleteStock }) => {
  const style = {
    align: 'center',
  };

  const handleDelete = () => {
    deleteStock(quote.symbol);
  };
  return (
    <div>
      {' '}
      <TableRow>
        <Alert severity='success'>Added</Alert>

        <TableCell align={style.align}>{quote.symbol}</TableCell>
        <TableCell align={style.align}>{quote.latestPrice}</TableCell>
        <TableCell align={style.align}>
          {(quote.changePercent * 100).toFixed(2)}%
        </TableCell>
        <TableCell align={style.align}>{quote.previousClose}</TableCell>
        <TableCell align={style.align}>
          <button onClick={handleDelete} type='submit'>
            <Delete />
          </button>
        </TableCell>
      </TableRow>
      {quote.xaa ? (
        <div className='quote'>
          <h2>{quote.symbol}</h2>
          <p> {quote.latestPrice}</p>
          <p>{(quote.changePercent * 100).toFixed(2)}%</p>
          <p>{quote.previousClose}</p>
          <button onClick={handleDelete} type='submit'>
            X{' '}
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DisplayAStock;
