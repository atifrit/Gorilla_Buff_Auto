import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { getUserCars } from '../../store/cars';
import './CarUpdateModal.css';


export default function CarUpdateModal(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const cars = useSelector((state) => state.cars)
    const ogCar_type = props.car_type;
    const ogMake = props.make;
    const ogModel = props.model;
    const user_id = props.user_id;
    const car_id = props.id
    const { closeModal } = useModal();

    const [make, setMake] = useState(ogMake);
    const [model, setModel] = useState(ogModel);
    const [carType, setCarType] = useState(ogCar_type);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!cars.hydrated) {
            dispatch(getUserCars());
        }
    }, [dispatch, cars])


    const handleSubmit = async (e) => {
        e.preventDefault();

        let car_type = carType;

        let updateRes = await fetch(`/api/cars/${car_id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ user_id, car_id, make, model, car_type })
        })
        if (updateRes.status > 400) {
            let res = await updateRes.json();
            let errorsStrings = []
            for (let el of res.errors) {
                for (let i in el) {
                    errorsStrings.push(el)
                }
            }
            setErrors(errorsStrings);
        } else {
            dispatch(getUserCars());
            closeModal();
        }
    }


    return (
        <div className='modal-overlay'>
            <h2 className="h1titletext">Update Your Car Details</h2>
            <form onSubmit={handleSubmit}>
            <label className="displayText" htmlFor="make">Make:</label>
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
                <label  className="displayText" htmlFor="model">Model:</label>
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
                    <button className="withdrawbutton" type='submit' disabled={make.length < 4 || model.length < 4 || carType == ''}>Update Car</button>
                </div>


            </form>
        </div>
    )

}
