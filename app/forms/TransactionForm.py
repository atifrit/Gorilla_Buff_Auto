from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, DecimalField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Transaction

class TransactionForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    booking_id = IntegerField('booking_id', validators=[DataRequired()])
    payment_method = StringField('payment_method', validators=[DataRequired()])
    balance_change = DecimalField('balance_change', validators=[DataRequired()])
