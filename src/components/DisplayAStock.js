import React, { useState, useEffect } from 'react';

import TableCell from '@material-ui/core/TableCell';

import TableRow from '@material-ui/core/TableRow';
import { Delete } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
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
    flexGrow: 1,
  },
}));

const DisplayAStock = ({ quote, deleteStock, newStock }) => {
  const [isNew, setIsNew] = useState(newStock);
  const classes = useStyles();
  useEffect(() => {
    console.log('DisplayASto  newStock = ' + newStock + '  ' + quote.symbol);

    if (newStock !== quote.symbol) {
      //     console.log('newStock is not symbol');
      setIsNew(null);
    } else {
      setTimeout(() => {
        setIsNew(null);
      }, 5000);
      console.log('newStock is A symbol');
    }
  }, []);
  const handleDelete = () => {
    deleteStock(quote.symbol);
  };
  return (
    <TableRow>
      {isNew ? (
        <Alert severity='success' className={classes.align1}>
          New
        </Alert>
      ) : (
        <div className={classes.spaceHolder}></div>
      )}
      <TableCell className={classes.align2}>{quote.symbol}</TableCell>
      <TableCell className={classes.align2}>{quote.latestPrice}</TableCell>
      <TableCell className={classes.align2}>
        {(quote.changePercent * 100).toFixed(2)}%
      </TableCell>
      <TableCell className={classes.align2}>{quote.previousClose}</TableCell>
      <TableCell className={classes.align1}>
        <button onClick={handleDelete} type='submit'>
          <Delete />
        </button>
      </TableCell>
    </TableRow>
  );
};

export default DisplayAStock;
