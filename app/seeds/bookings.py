from app.models import db, User, Booking, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


def seed_bookings():

    demo_date = datetime.date(2020, 12, 31)
    marnie_date = datetime.date(2023, 11, 20)
    bobbie_date = datetime.date(2023, 10, 31)

    demo_booking = Booking(appointment_date=demo_date, car_type='sport', service_type='full_detail')
    marnie_booking = Booking(appointment_date=marnie_date, car_type='suv', service_type='basic_wash')
    bobbie_booking = Booking(appointment_date=bobbie_date, car_type='sedan', service_type='premium_wash')

    db.session.add(demo_booking)
    db.session.add(marnie_booking)
    db.session.add(bobbie_booking)

    db.session.commit()


def undo_bookings():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookings RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookings"))

    db.session.commit()
