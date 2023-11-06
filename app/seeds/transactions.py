from app.models import db, User, Booking, Transaction, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


def seed_transactions():

    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    demo_booking = Booking.query.filter_by(id=1).first()
    marnie_booking = Booking.query.filter_by(id=2).first()
    bobbie_booking = Booking.query.filter_by(id=3).first()

    demo_date = datetime.date(2020, 12, 20)
    bobbie_date = datetime.date(2023, 10, 21)

    demo_transaction = Transaction(user_id=demo_booking.id, booking_id=demo_booking.id, payment_method='credit', created_at=demo_date)
    marnie_transaction = Transaction(user_id=marnie_booking.id, booking_id=marnie_booking.id, payment_method='debit')
    bobbie_transaction = Transaction(user_id=bobbie_booking.id, booking_id=bobbie_booking.id, payment_method='cash', created_at=bobbie_date)

    db.session.add(demo_transaction)
    db.session.add(marnie_transaction)
    db.session.add(bobbie_transaction)

    db.session.commit()


def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM transactions"))

    db.session.commit()
