from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Car

class CarForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    make = StringField('make', validators=[DataRequired()])
    car_type = StringField('car_type', validators=[DataRequired()])
    model = StringField('model', validators=[DataRequired()])
