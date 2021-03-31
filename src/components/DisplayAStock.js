import React, { useState, useEffect } from 'react';

import { TableCell, TableRow, Fade } from '@material-ui/core/';
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
    paddingRight: 0,
  },
}));

const DisplayAStock = ({ quote, deleteStock, newStock }) => {
  const [isNew, setIsNew] = useState(true);
  const classes = useStyles();
  useEffect(() => {
    if (newStock !== quote.symbol) {
      //     console.log('newStock is not symbol');
      setIsNew(false);
    } else {
      setTimeout(() => {
        setIsNew(false);
      }, 5000);
    }
  });
  const handleDelete = () => {
    deleteStock(quote.symbol);
  };
  return (
    <TableRow>
      <TableCell className={classes.spaceHolder}>
        <Fade in={isNew} timeout={{ enter: 0, exit: 1000 }}>
          <Alert severity='success'>New</Alert>
        </Fade>
      </TableCell>

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
