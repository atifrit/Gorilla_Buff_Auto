import React, { useState, useEffect, useSelector } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import 'TransactionForm.css';

export default function TransactionFormModal(props) {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('1');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='transactionFormContainer'>
            <h1>Complete Your Transaction</h1>
            <form className='transactionFormModalForm' onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={false} className="transactionSubmitButton" >Complete Transaction</button>
                </div>
            </form>
        </div>
    )

}
