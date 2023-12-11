from .db import db, environment, SCHEMA, add_prefix_for_prod

class Car(db.Model):
    __tablename__ = 'cars'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    car_type = db.Column(db.String(255), nullable=False)
    make = db.Column(db.String(255), nullable = False)
    model = db.Column(db.String(255), nullable = False)

    user = db.relationship('User', back_populates='cars')
