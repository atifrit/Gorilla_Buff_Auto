"""empty message

Revision ID: 6feb1dc2495c
Revises: 4f8ec9a27dda
Create Date: 2023-11-06 13:06:51.487685

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6feb1dc2495c'
down_revision = '4f8ec9a27dda'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('balance', sa.Float(precision=2), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('balance')

    # ### end Alembic commands ###