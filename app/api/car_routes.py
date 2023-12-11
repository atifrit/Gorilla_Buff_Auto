from flask import Blueprint, jsonify, session, request
from app.models import Transaction, Booking, User, Car, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import CarForm
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
    carForm=CarForm()
    carForm['csrf_token'].data = request.cookies['csrf_token']

    if carForm.validate_on_submit():
        new_car = Car(user_id=current_user.id, make=carForm.data['make'], model=carForm.data['model'], car_type=carForm.data['car_type'])
        db.session.add(new_car)
        db.session.commit()
        return ({'message': 'Car Added Successfully'})

    return {'errors': validation_errors_to_error_messages(carForm.errors)}, 401


@car_routes.route('/<int:car_id>', methods=['PUT'])
@login_required
def updateCar(car_id):
    carForm=CarForm()
    carForm['csrf_token'].data = request.cookies['csrf_token']

    if carForm.validate_on_submit():
        car = Car.query.get(car_id)
        car.make = carForm.data['make']
        car.model = carForm.data['model']
        car.car_type = carForm.data['car_type']

        db.session.commit()

        return jsonify({'message': 'update successful'}), 201

    return {'errors': validation_errors_to_error_messages(transactionForm.errors)}, 401


@car_routes.route('/<int:car_id>', methods=['DELETE'])
@login_required
def deleteCar(car_id):
    car = Car.query.get(car_id)

    if not car:
        return jsonify({"error": "Car not found"}), 404


    db.session.delete(car)
    db.session.commit()
    return jsonify({'message': 'successfully deleted'})
