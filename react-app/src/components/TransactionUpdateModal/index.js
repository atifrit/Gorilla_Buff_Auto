import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import './TransactionUpdate.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeBalanceFromUser, addBalanceToUser } from "../../store/session";
import { getTransactions } from "../../store/transactions";


export default function TransactionUpdateModal(props) {
    const ogPay = props.paymentMethod;
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState(ogPay);
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();
    const user = props.user;

    const transactionId=props.transaction_id;
    const booking_id = props.booking_id;
    const user_id = user.id;
    const payment_method = paymentMethod
    const balance_change = props.price


    const handleSubmit = async (e) => {
        e.preventDefault();

        let updateRes = await fetch(`/api/transactions/${transactionId}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, booking_id, payment_method, balance_change })
        })
        if(updateRes.status > 400) {
            let res = await updateRes.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            if(ogPay=='balance') {
                closeModal();
                dispatch(addBalanceToUser(balance_change))
                dispatch(getTransactions())
                history.push('/profilepage/')
            } else if (payment_method=='balance') {
                closeModal();
                dispatch(removeBalanceFromUser(balance_change))
                dispatch(getTransactions())
                history.push('/profilepage/')
            } else {
                closeModal();
                dispatch(getTransactions())
                history.push('/profilepage/')
            }
        }


    }


    return (
        <div className='transactionFormContainer'>
            <h1>Update Your Payment Method</h1>
            <p>{balance_change > 0 ? `Total: $${balance_change.toFixed(2)}` : null}</p>
            <form className='transactionFormModalForm' onSubmit={handleSubmit}>
                <p className="errors">{(ogPay !== 'balance' && paymentMethod === 'balance' && balance_change > user.balance) ? 'Inusfficient Funds' : null}</p>
                <p>{paymentMethod === ogPay ? 'Please Update Your Payment Method' : null}</p>
                <label>
                    Payment Method:
                    <select value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value=''>Select Payment Type</option>
                        <option value='credit'>Credit (paid in person)</option>
                        <option value='debit'>Debit (paid in person)</option>
                        <option value='cash'>Cash (paid in person)</option>
                        <option value='balance'>Account Balance</option>
                    </select>
                </label>

                <div className="transactionFormModalSubmitContainer">
                    <button type="submit" disabled={(paymentMethod === 'balance' && balance_change > user.balance) || paymentMethod === '' || paymentMethod === ogPay} className="transactionSubmitButton" >Update Transaction</button>
                </div>
            </form>
        </div>
    )
}
