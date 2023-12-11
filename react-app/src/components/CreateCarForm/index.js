import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { getUserCars } from "../../store/cars";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import TransactionFormModal from "../TransactionFormModal";

import './CreateCarForm.css';


function CreateCarForm() {
    const dispatch = useDispatch();
    const history = useHistory()
    const user = useSelector((state) => state.session.user);
    const cars = useSelector((state) => state.cars)
    const [make, setMake] = useState("");
    const [model, setModel] = useState('');
    const [carType, setCarType] = useState('');
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

    useEffect(() => {
        if (!cars.hydrated) {
            dispatch(getUserCars());
        }
    }, [dispatch, cars])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let user_id = user.id;
        let car_type = carType;

        let car_reponse = await fetch('/api/cars/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ make, car_type, model, user_id })
        })
        if (car_reponse.status > 400) {
            let res = await car_reponse.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            dispatch(getUserCars())
            history.push('/profilepage')
        }

    }

    if (user) {
        return (
            <div className='newbookingcontainer'>
                <div className="signupformMod2">
                    <h2 className="h1title">Add a Car to Your Account</h2>
                    <ul className="signup-errors">
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <form onSubmit={handleSubmit}>
                        <input
                            className="signupFormInput"
                            type='text'
                            name='make'
                            value={make}
                            placeholder="Make"
                            onChange={(e) => {
                                setMake(e.target.value);
                            }}
                            required
                        />
                        <p className="errors">{make.length < 4 && make.length > 0 ? 'make must be 4 or more characters' : null}</p>
                        <input
                            className="signupFormInput"
                            type='text'
                            name='model'
                            value={model}
                            placeholder="Model"
                            onChange={(e) => {
                                setModel(e.target.value);
                            }}
                            required
                        />
                        <p className="errors">{model.length < 4 && model.length > 0 ? 'model must be 4 or more characters' : null}</p>
                        <label className="displayText" htmlFor="car">Select Car Type:</label>
                        <select className="signupFormInput" name='car' value={carType} onChange={(e) => {
                            setCarType(e.target.value);
                        }}>
                            <option value=''>Car Type</option>
                            <option value='sedan'>Sedan</option>
                            <option value='sport'>Sport</option>
                            <option value='suv'>SUV</option>
                        </select>

                        <div className="buttonContainer">
                            <button className="withdrawbutton" type='submit' disabled={make.length < 4 || model.length < 4 || carType == ''}>Add Car</button>
                        </div>


                    </form>
                </div>
            </div>
        )
    } else return (<Redirect to='/' />)

}

export default CreateCarForm;
