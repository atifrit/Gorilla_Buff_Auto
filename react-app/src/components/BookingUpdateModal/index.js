import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { removeBalanceFromUser, addBalanceToUser } from "../../store/session";
import { getTransactions } from "../../store/transactions";

import './BookingUpdate.css';
import { getAllDates, getUserBookings } from "../../store/bookings";


function reformatDate(date) {
    let newDate = new Date(date).toLocaleDateString('en-US', {
        timeZone: 'UTC',
    }).replace(/\//g, '-');
    return newDate;
}

export default function BookingUpdateModal(props) {

    const bookings = props.bookings;
    const user = props.user;
    const ogCarType = props.car_type;
    const ogDate_unformatted = reformatDate(new Date(props.appointment_date));
    const ogServiceType = props.service_type;

    let payment_method = props.payment_method;

    let ogDate;
    let ogDateInput;

    console.log('ogDate_unformatted: ', ogDate_unformatted);

    let ogInputDay = ogDate_unformatted.slice(3, 5);
    let ogInputMonth = ogDate_unformatted.slice(0, 2)
    let ogInputYear = ogDate_unformatted.slice(6)

    ogDate = `${ogInputMonth}-${ogInputDay}-${ogInputYear}`
    console.log('ogDate1: ', ogDate)
    ogDateInput = `${ogInputYear}-${ogInputMonth}-${ogInputDay}`


    const dispatch = useDispatch();
    const [appointmentDate, setAppointmentDate] = useState(ogDateInput);
    const [serviceType, setServiceType] = useState(props.service_type);
    const [carType, setCarType] = useState(props.car_type);
    const [errors, setErrors] = useState([]);
    const [showMenu, setShowMenu] = useState(false);

    const { closeModal } = useModal();

    const closeMenu = (e) => {
        setShowMenu(false);
    };
    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const occupied = bookings.occupiedDates;

    let occupiedBool = false;

    for (let el of occupied) {
        console.log('made it to check')
        let comparison = reformatDate(el);
        let inputDate = '';

        console.log(comparison);

        if (appointmentDate.length) {
            let inputDay = appointmentDate.slice(8);
            let inputMonth = appointmentDate.slice(5, 7)
            let inputYear = appointmentDate.slice(0, 4)

            inputDate = `${inputMonth}-${inputDay}-${inputYear}`
        }

        console.log('input date: ', inputDate);
        console.log('ogDate: ', ogDate);


        if (comparison == inputDate && inputDate !== ogDate) {
            occupiedBool = true;
        }
    }


    let pastBool = false;

    if (new Date().getTime() > new Date(appointmentDate).getTime()) {
        pastBool = true;
    }


    let sedan = 1;
    let sport = 2;
    let suv = 1.5;

    let basic = 75;
    let premium = 150;
    let full = 200;


    let car;
    let service;

    let ogCar;
    let ogService;

    if (carType === 'sedan') {
        car = sedan;
    } else if (carType === 'sport') {
        car = sport;
    } else if (carType === 'suv') {
        car = suv
    }


    if (serviceType === 'basic') {
        service = basic;
    } else if (serviceType === 'premium') {
        service = premium;
    } else if (serviceType === 'full') {
        service = full;
    }
    if (ogCarType === 'sedan') {
        ogCar = sedan;
    } else if (ogCarType === 'sport') {
        ogCar = sport;
    } else if (ogCarType === 'suv') {
        ogCar = suv
    }


    if (ogServiceType === 'basic') {
        ogService = basic;
    } else if (ogServiceType === 'premium') {
        ogService = premium;
    } else if (ogServiceType === 'full') {
        ogService = full;
    }

    let ogPrice = (ogCar * ogService)

    let price = (car * service) - ogPrice;



    const handleSumbit = async (e) => {
        e.preventDefault();

        let car;
        let service;

        let ogCar;
        let ogService;

        if (carType === 'sedan') {
            car = sedan;
        } else if (carType === 'sport') {
            car = sport;
        } else if (carType === 'suv') {
            car = suv
        }


        if (serviceType === 'basic') {
            service = basic;
        } else if (serviceType === 'premium') {
            service = premium;
        } else if (serviceType === 'full') {
            service = full;
        }
        if (ogCarType === 'sedan') {
            ogCar = sedan;
        } else if (ogCarType === 'sport') {
            ogCar = sport;
        } else if (ogCarType === 'suv') {
            ogCar = suv
        }


        if (ogServiceType === 'basic') {
            ogService = basic;
        } else if (ogServiceType === 'premium') {
            ogService = premium;
        } else if (ogServiceType === 'full') {
            ogService = full;
        }

        let ogPrice = (ogCar * ogService)

        let price = (car * service) - ogPrice;


        let appointment_date = appointmentDate;
        let car_type = carType;
        let service_type = serviceType;
        let balance_change = price;
        let user_id = props.user.id;
        let payment_method = props.payment_method;
        let booking_id = props.bookingId;

        if (price) {
            let updated = await fetch(`/api/bookings/${props.bookingId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appointment_date, car_type, service_type })
            })
            if (updated.status > 400) {
                let res = await updated.json()
                console.error(res.errors)
            } else {
                let new_transaction = await fetch('/api/transactions/', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ user_id, booking_id, balance_change, payment_method })
                })
                let transactionRes = await new_transaction.json()
                if (new_transaction.status > 400) {
                    console.error(transactionRes.errors)
                } else if (transactionRes.paymentMethod == 'balance') {
                    dispatch(removeBalanceFromUser(balance_change))
                    closeModal()
                    dispatch(getTransactions())
                    dispatch(getUserBookings())
                    dispatch(getAllDates())
                } else {
                    closeModal()
                    dispatch(getTransactions())
                    dispatch(getUserBookings())
                    dispatch(getAllDates())
                }
            }
        } else {
            let updated = await fetch(`/api/bookings/${props.bookingId}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ appointment_date, car_type, service_type })
            })
            if (updated.status > 400) {
                let res = await updated.json()
                console.error(res.errors)
            } else {
                closeModal()
                dispatch(getUserBookings())
                dispatch(getAllDates())
                dispatch(getTransactions())
            }
        }

    }

    return (
        <div className="modal-overlay">
            <form className="signupform" onSubmit={handleSumbit}>
                <h2>Update Your Appointment</h2>
                <div>
                    <ul className="signup-errors">
                        {errors.map((error, idx) => <li className="errors" key={idx}>{error}</li>)}
                    </ul>
                    <p>{price < 0 ? `You will be refunded $${(price * -1).toFixed(2)}` : null}</p>
                    <p>{price > 0 ? `Total: $${price.toFixed(2)}` : null}</p>
                </div>
                <input
                    className="signupFormInput"
                    type='date'
                    name='dateInput'
                    value={appointmentDate}
                    placeholder="Appointment Date"
                    onChange={(e) => {
                        setAppointmentDate(e.target.value);
                        console.log(appointmentDate);
                    }}
                    required
                />
                <p className="errors">{occupiedBool && !pastBool ? 'Appointment Date Taken' : null}</p>
                <p className="errors">{pastBool ? 'Cannot make Appointments in the Past' : null}</p>
                <label className="selectFormText" htmlFor="car">Select Car Type:</label>
                <select className="signupFormInput" name='car' value={carType} onChange={(e) => {
                    setCarType(e.target.value);
                    console.log(carType);
                }}>
                    <option value=''>Car Type</option>
                    <option value='sedan'>Sedan</option>
                    <option value='sport'>Sport</option>
                    <option value='suv'>SUV</option>
                </select>
                <label className="selectFormText" htmlFor="service">Select Service Type:</label>
                <select className="signupFormInput" name='service' value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                    <option value=''>Service Type</option>
                    <option value='basic'>Basic Wash</option>
                    <option value='premium'>Premium Exterior Detail</option>
                    <option value='full'>Premium Exterior and Interior Detail</option>
                </select>

                <button className="withdrawbutton" disabled={occupiedBool || pastBool || (price > user.balance && payment_method == 'balance')} onClick={handleSumbit}>Update Booking</button>
            </form>
        </div>
    )

}
