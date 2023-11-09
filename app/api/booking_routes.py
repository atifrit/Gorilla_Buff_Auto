from flask import Blueprint, jsonify, session, request
from app.models import Transaction, Booking, User, db
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import BookingForm

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


bookings_routes = Blueprint('bookings', __name__)

@bookings_routes.route('/')
@login_required
def get_current_user_bookings():

    transactions = Transaction.query.filter_by(user_id=current_user.id).all()
    booking_ids = []

    for transaction in transactions:
        if(transaction.booking_id not in booking_ids):
            booking_ids.append(transaction.booking_id)

    bookings = Booking.query.filter(Booking.id.in_(booking_ids)).all()

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


@bookings_routes.route('/', methods=['POST'])
@login_required
def createBooking():
    bookingForm = BookingForm()
    bookingForm['csrf_token'].data = request.cookies['csrf_token']

    if bookingForm.validate_on_submit():
        new_booking = Booking(appointment_date=bookingForm.data['appointment_date'], car_type=bookingForm.data['car_type'], service_type=bookingForm.data['service_type'])
        db.session.add(new_booking)
        db.session.commit()
        res_booking = Booking.query.filter_by(appointment_date=bookingForm.data['appointment_date']).first()
        return jsonify({'booking': res_booking.id}), 201
    return {'errors': validation_errors_to_error_messages(bookingForm.errors)}, 401
