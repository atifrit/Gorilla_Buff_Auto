from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    booking_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bookings.id')), nullable=False)
    payment_method = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.Date)

    user = db.relationship('User', back_populates='transactions')
    booking = db.relationship('Booking', back_populates='transactions')
