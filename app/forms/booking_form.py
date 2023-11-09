from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Booking

class BookingForm(FlaskForm):
    appointment_date = DateField('appointment_date', validators=[DataRequired()])
    car_type = StringField('companyId', validators=[DataRequired()])
    service_type = StringField('balanceDeduct', validators=[DataRequired()])
