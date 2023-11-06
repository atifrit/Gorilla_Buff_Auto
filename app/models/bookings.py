from .db import db, environment, SCHEMA, add_prefix_for_prod

class Booking(db.Model):
    __tablename__ = 'bookings'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    appointment_date = db.Column(db.Date, nullable=False)
    car_type = db.Column(db.String(255), nullable=False)
    service_type = db.Column(db.String(255), nullable=False)

    transactions = db.relationship('Transaction', back_populates='booking')
