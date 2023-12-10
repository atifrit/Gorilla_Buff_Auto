from flask import Blueprint, jsonify, session, request
from app.models import Transaction, Booking, User, Car, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import TransactionForm
from sqlalchemy import desc

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


car_routes = Blueprint('cars', __name__)

@car_routes.route('/')
@login_required
def getUserCars():
    cars = Car.query.filter_by(user_id=current_user.id).all()

    car_details = []

    for car in cars:
        car_details.append({
            'id': car.id,
            'user_id': car.user_id,
            'make': car.make,
            'model': car.model,
            'car_type' : car.car_type,
        })

    return jsonify(car_details)



@car_routes.route('/', methods=['POST'])
@login_required
def createCar():
