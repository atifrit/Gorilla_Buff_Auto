from flask import Blueprint, jsonify, session, request
from app.models import Transaction, Booking, User, db
from flask_login import current_user, login_user, logout_user, login_required

bookings_routes = Blueprint('bookings', __name__)

@bookings_routes.route('/')
@login_required
def get_current_user_bookings():

    transactions = Transaction.query.filter_by(user_id=current_user.id).all()
    booking_ids = []

    for transaction in transactions:
        if(transaction.booking_id not in booking_ids):
            booking_ids.append(transaction.booking_id)

    bookings = Booking.query.filter_by(id=booking_ids[0]).all()

    booking_details=[]

    for booking in bookings:
        booking_details.append(
            {
                'id': booking.id,
                'appointment_date': booking.appointment_date,
                'car_type': booking.car_type,
                'service_type': booking.service_type
            }
        )


    return jsonify({
        'user_id': current_user.id,
        'booking_details': booking_details
        })


@bookings_routes.route('/dates')
@login_required
def get_all_dates():
    bookings = Booking.query.all()

    booking_dates = [booking.appointment_date for booking in bookings]

    return jsonify(booking_dates)
