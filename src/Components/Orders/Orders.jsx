import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {getQuantityOfOrders} from '../../api'
import {useState, useEffect} from "react";

function Orders() {
    const [orders, setOrders] = useState(null)

    useEffect(() => {
        getQuantityOfOrders().then(orders => {
            const sortedOrders = Object.entries(orders).sort((a, b) => b[1] - a[1]);
            setOrders(sortedOrders)
        });

    }, [])

    return (
        <>
            {orders && <TableContainer sx={{ width: 650, margin: 'auto'}} component={Paper}>
                <Table sx={{ width: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Наименование документа</TableCell>
                            <TableCell align="right">Количество заказов</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => {
                            const [docName, qty] = order;
                            return (
                                        <TableRow
                                        key={docName}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {docName}
                                        </TableCell>
                                        <TableCell align="right">{qty}</TableCell>

                                    </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>}
        </>
    );
}


export default Orders;