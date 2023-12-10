from app.models import db, Car, User, environment, SCHEMA
from sqlalchemy.sql import text
import datetime


def seed_cars():

    demo = User.query.filter_by(username='Demo').first()
    marnie = User.query.filter_by(username='marnie').first()
    bobbie = User.query.filter_by(username='bobbie').first()

    demo_car1 = Car(user_id=demo.id, car_type='sport', make='Ford', model='Mustang')
    demo_car2 = Car(user_id=demo.id, car_type='sedan', make='Toyota', model='Prius')
    marnie_car = Car(user_id=marnie.id, car_type='suv', make='Jeep', model='Grand Cherokee')
    bobbie_car = Car(user_id=bobbie.id, car_type='sedan', make='Toyota', model='Prius V')

    db.session.add(demo_car1)
    db.session.add(demo_car2)
    db.session.add(marnie_car)
    db.session.add(bobbie_car)

    db.session.commit()


def undo_cars():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cars RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cars"))

    db.session.commit()
