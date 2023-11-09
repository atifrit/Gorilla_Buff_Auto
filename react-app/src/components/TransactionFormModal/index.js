import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import './TransactionForm.css';
import bookingsReducer from "../../store/bookings";

export default function TransactionFormModal(props) {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('1');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    let sedan = 1;
    let sport = 2;
    let suv = 1.5;

    let basic = 75;
    let premium = 150;
    let full = 200;


    let car;
    let service;

    if (props.car_type === 'sedan') {
        car = sedan;
    } else if (props.car_type === 'sport') {
        car = sport;
    } else if (props.car_type === 'suv') {
        car = suv
    }


    if (props.service_type === 'basic') {
        service = basic;
    } else if (props.service_type === 'premium') {
        service = premium;
    } else if (props.service_type === 'full') {
        service = full;
    }

    let balanceChange = car * service;


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user_id = props.user.id;
        const appointment_date = props.appointment_date;
        const car_type = props.car_type;
        const service_type = props.service_type;
        const payment_method = paymentMethod;
        const balance_change = balanceChange;
        let booking_reponse = await fetch('/api/bookings/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ appointment_date, car_type, service_type })
        })
        if (booking_reponse.status > 400) {
            let res = await booking_reponse.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            let new_booking = await booking_reponse.json()
            let booking_id = new_booking.id
            let transaction_reponse = await fetch('/api/transactions/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, booking_id, payment_method, balance_change })
            })
            if (transaction_reponse.status > 400) {
                let res = await booking_reponse.json();
                let errorsStrings = []
                for (let el of res.errors) {
                    for (let i in el) {
                        errorsStrings.push(el)
                    }
                }
                setErrors(errorsStrings);
            } else {
                closeModal();
                alert('Thank you for your purchase!')
                window.location.reload()
            }
        }

    }

    return (
        <div className='transactionFormContainer'>
            <h1>Complete Your Transaction</h1>
            <form className='transactionFormModalForm' onSubmit={handleSubmit}>
                <p className="errors">{(paymentMethod === 'balance' && balanceChange > props.user.balance) ? 'Inusfficient Funds' : null}</p>
                <label>
                    Payment Method:
                    <select value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}>
                        <option value='credit'>Credit (paid in person)</option>
                        <option value='debit'>Debit (paid in person)</option>
                        <option value='cash'>Cash (paid in person)</option>
                        <option value='balance'>Account Balance</option>
                    </select>
                </label>

                <div className="transactionFormModalSubmitContainer">
                    <button type="submit" disabled={(paymentMethod === 'balance' && balanceChange > props.user.balance)} className="transactionSubmitButton" >Complete Transaction</button>
                </div>
            </form>
        </div>
    )

}
