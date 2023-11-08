from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/add_balance', methods=['POST'])
@login_required
def userbalanceadd():
    user = User.query.filter_by(id=current_user.id).first()

    data = request.get_json()


    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount not provided'}), 400

    amount = float(data['amount'])

    if amount < 0:
        return jsonify({'error': 'Invalid amount'}), 400

    user.balance += amount

    db.session.commit()

    return jsonify({'message': 'Balance updated successfully', 'new_balance': user.balance})


@user_routes.route('/remove_balance', methods=['POST'])
@login_required
def userbalanceremove():
    user = User.query.filter_by(id=current_user.id).first()

    data = request.get_json()


    if not data or 'amount' not in data:
        return jsonify({'error': 'Amount not provided'}), 400

    amount = float(data['amount'])

    if amount < 0:
        return jsonify({'error': 'Invalid amount'}), 400

    if amount > user.balance:
        return jsonify({'error': 'Insufficient funds'}), 400

    user.balance -= amount

    db.session.commit()

    return jsonify({'message': 'Balance updated successfully', 'new_balance': user.balance})
