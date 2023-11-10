from flask import Blueprint, jsonify, session, request
from app.models import Transaction, Booking, User, Transaction, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import TransactionForm
from sqlalchemy import desc

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


transaction_routes = Blueprint('transactions', __name__)

@transaction_routes.route('/')
@login_required
def getUserTransactions():
    transactions = Transaction.query.filter_by(user_id=current_user.id).order_by(desc(Transaction.created_at)).all()

    transaction_details = []

    for transaction in transactions:
        transaction_details.append({
            'id': transaction.id,
            'user_id': transaction.user_id,
            'booking_id': transaction.booking_id,
            'payment_method': transaction.payment_method,
            'created_at': transaction.created_at,
            'price': transaction.price
        })

    return jsonify(transaction_details)



@transaction_routes.route('/', methods=['POST'])
@login_required
def createTransaction():
    transactionForm=TransactionForm()
    transactionForm['csrf_token'].data = request.cookies['csrf_token']

    if transactionForm.validate_on_submit():
        new_transaction = Transaction(user_id=current_user.id, booking_id=transactionForm.data['booking_id'], payment_method=transactionForm.data['payment_method'], price=transactionForm.data['balance_change'])
        db.session.add(new_transaction)
        db.session.commit()
        if(transactionForm.data['payment_method'] == 'balance'):
            return jsonify({"message": "balance deduction successful"}), 201
        return ({"message": "transaction successful"}), 201

    return {'errors': validation_errors_to_error_messages(transactionForm.errors)}, 401


@transaction_routes.route('/<int:transaction_id>', methods=['PUT'])
@login_required
def updateTransaction(transaction_id):
    transactionForm=TransactionForm()
    transactionForm['csrf_token'].data = request.cookies['csrf_token']


    if transactionForm.validate_on_submit():
        transaction = Transaction.query.get(transaction_id)
        transaction.payment_method = transactionForm.data['payment_method']
        db.session.commit()

        return jsonify({'message': 'update successful'}), 201

    return {'errors': validation_errors_to_error_messages(transactionForm.errors)}, 401
