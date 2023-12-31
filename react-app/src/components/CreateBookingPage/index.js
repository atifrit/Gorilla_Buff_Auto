import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAllDates } from "../../store/bookings";
import OpenModalButton from "../OpenModalButton";
import TransactionFormModal from "../TransactionFormModal";



import './CreateBookingPage.css';



function reformatDate(date) {
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
    const [showMenu, setShowMenu] = useState(false);

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

        if (appointmentDate.length) {
            let inputDay = appointmentDate.slice(8);
            let inputMonth = appointmentDate.slice(5, 7)
            let inputYear = appointmentDate.slice(0, 4)

            inputDate = `${inputMonth}-${inputDay}-${inputYear}`
        }

        console.log('input date: ', inputDate);


        if (comparison == inputDate) {
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

        let price = car * service;


        let booking = {
            appointmentDate,
            serviceType,
            carType,
            price
        }
    }



    if (user) {
        return (
            <div className = 'newbookingcontainer'>
            <div className="signupformMod2">
                <h2 className="h1title">Create a New Appointment</h2>
                <ul className="signup-errors">
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <form onSubmit={handleSumbit}>
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
                    <label className="displayText" htmlFor="car">Select Car Type:</label>
                    <select className="signupFormInput" name='car' value={carType} onChange={(e) => {
                        setCarType(e.target.value);
                        console.log(carType);
                    }}>
                        <option value=''>Car Type</option>
                        <option value='sedan'>Sedan</option>
                        <option value='sport'>Sport</option>
                        <option value='suv'>SUV</option>
                    </select>
                    <label className="displayText" htmlFor="service">Select Service Type:</label>
                    <select className="signupFormInput" name='service' value={serviceType} onChange={(e) => setServiceType(e.target.value)}>
                        <option value=''>Service Type</option>
                        <option value='basic'>Basic Wash</option>
                        <option value='premium'>Premium Exterior Detail</option>
                        <option value='full'>Premium Exterior and Interior Detail</option>
                    </select>

                </form>
                <OpenModalButton
                    className='withdrawbutton'
                    buttonText="Create Booking"
                    onItemClick={closeMenu}
                    modalComponent={
                        <TransactionFormModal
                            car_type={carType}
                            service_type={serviceType}
                            appointment_date={appointmentDate}
                            user={user}
                        />
                    }
                    disabled={occupiedBool || pastBool || appointmentDate === "" || carType === '' || serviceType === ''}
                />
            </div>
            </div>
        )
    } else return (<Redirect to='/' />)

}

export default CreateBookingForm;
