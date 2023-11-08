import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllDates } from "../../store/bookings";



import './CreateBookingPage.css';


function reformatDate (date) {
    let newDate = new Date(date).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    }).replace(/\//g, '-');
    return newDate;
}

function CreateBookingForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const bookings = useSelector((state) => state.bookings)
    const [appointmentDate, setAppointmentDate] = useState("");
    const [serviceType, setServiceType] = useState('');
    const [carType, setCarType] = useState('');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!bookings.occupiedDates || bookings.occupiedDates.length === 0) {
            dispatch(getAllDates());
        }
    }, [dispatch, bookings])


    const occupied = bookings.occupiedDates;

    let occupiedBool = false;

    for (let el of occupied) {
        console.log('made it to check')
        let comparison = reformatDate(el);
        let inputDate = '';

        console.log(comparison);

        if(appointmentDate.length) {
            let inputDay = appointmentDate.slice(8);
            let inputMonth = appointmentDate.slice(5, 7)
            let inputYear = appointmentDate.slice(0, 4)

            inputDate = `${inputMonth}-${inputDay}-${inputYear}`
        }

        console.log('input date: ', inputDate);


        if(comparison == inputDate) {
            occupiedBool = true;
        }
    }



    let sedan = 1;
    let sport = 2;
    let suv = 1.5;

    let basic = 75;
    let premium = 150;
    let full = 200;




    const handleSumbit = async (e) => {
        e.preventDefault();

        let car;
        let service;

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

        let price = car*service;


        let booking = {
            appointmentDate,
            serviceType,
            carType,
            price
        }
    }



    if(user) {
        return (
            <>
                <h2>Create a New Appointment</h2>
                <ul className="signup-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSumbit}>
                    <input
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
                    <p className="errors">{occupiedBool ? 'Appointment Date Taken' : null}</p>
                    <label htmlFor="car">Select Car Type:</label>
                    <select name='car' value={carType} onChange={(e) => {
                        setCarType(e.target.value);
                        console.log(carType);
                        }}>
                        <option value='sedan'>Sedan</option>
                        <option value='sport'>Sport</option>
                        <option value='suv'>SUV</option>
                    </select>
                    <label htmlFor="service">Select Service Type:</label>
                    <select name='service' value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                        <option value='basic'>Basic Wash</option>
                        <option value='premium'>Premium Exterior Detail</option>
                        <option value='full'>Premium Exterior and Interior Detail</option>
                    </select>

                    <button id="booking-submit-button" type="submit" disabled={occupiedBool}>Create Appointment</button>
                </form>
            </>
        )
    } else return (<Redirect to='/' />)

}

export default CreateBookingForm;
