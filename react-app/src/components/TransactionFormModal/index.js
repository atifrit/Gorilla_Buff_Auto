import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import './TransactionForm.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function TransactionFormModal(props) {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();
    const history = useHistory();

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
            let booking_id = new_booking.booking
            let transaction_reponse = await fetch('/api/transactions/', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ user_id, booking_id, payment_method, balance_change })
            })
            if (transaction_reponse.status > 400) {
                let transaction_res = await transaction_reponse.json();
                let errorsStrings = []
                for (let el of transaction_res.errors) {
                    for (let i in el) {
                        errorsStrings.push(el)
                    }
                }
                setErrors(errorsStrings);
            } else {
                closeModal();
                alert('Thank you for your purchase!')
                history.push('/bookings/')
            }
        }

    }

    return (
        <div className='transactionFormContainer'>
            <h1>Complete Your Transaction</h1>
            <p>{balanceChange > 0 ? `Total: $${balanceChange.toFixed(2)}`:null}</p>
            <form className='transactionFormModalForm' onSubmit={handleSubmit}>
                <p className="errors">{(paymentMethod === 'balance' && balanceChange > props.user.balance) ? 'Inusfficient Funds' : null}</p>
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
                    <button type="submit" disabled={(paymentMethod === 'balance' && balanceChange > props.user.balance) || paymentMethod===''} className="transactionSubmitButton" >Complete Transaction</button>
                </div>
            </form>
        </div>
    )

}
