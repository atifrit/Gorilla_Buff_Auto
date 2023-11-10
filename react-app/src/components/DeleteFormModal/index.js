import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { getAllDates, getUserBookings } from "../../store/bookings";
import { useModal } from "../../context/Modal";
import { addBalanceToUser } from "../../store/session";
import './DeleteFormModal.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getTransactions } from "../../store/transactions";

export default function DeleteFormModal(props) {
    let bookingId = Number(props.bookingId);
    const dispatch = useDispatch();
    const history = useHistory();
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

    const handleCancel = async (e) => {
        e.preventDefault()
        closeModal()
    }

    const handleDelete = async (e) => {
        e.preventDefault();

        let response = await fetch(`/api/bookings/${bookingId}`, {method:'DELETE'})
        if (response.status > 400) {
            let data = await response.json();
            let errorsStrings = []
            for (let el of data.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            let data = await response.json()
            dispatch(getUserBookings(data))
            dispatch(getAllDates())
            dispatch(addBalanceToUser(balanceChange))
            dispatch(getTransactions())
            history.push('/boookings/')
            closeModal()
        }
    }


    return (
        <>
            <h1>Are you sure you would like to refund this booking?</h1>
            <p>{`You will be refunded $${balanceChange.toFixed(2)} to your account balance`}</p>
            <div className="deleteFormButtons">
                <button onClick={handleDelete}>Refund Booking</button>
                <button onClick={handleCancel}>Cancel</button>
            </div>
        </>

    )
}
