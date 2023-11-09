import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { getUserBookings } from "../../store/bookings";

import './DeleteFormModal.css';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteFormModal(props) {
    bookingId = props.bookingId;
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();

    const handleDelete = async (e) => {
        e.preventDefault();

        response = await fetch(`/api/bookings/${bookingId}`, {method:'DELETE'})
        if (response.status > 400) {
            let data = await reponse.json();
            let errorsStrings = []
            for (let el of data.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            data = await response.json()
            dispatch(getUserBookings(data))
            history.push('/bookings/')
        }
    }


    return (
        <>
            <h1>Are you sure you would like to refund this booking?</h1>
            <div className="deleteFormButtons">
                <button onClick={handleDelete}>Refund Booking</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </>

    )
}
