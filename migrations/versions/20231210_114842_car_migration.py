"""car migration

Revision ID: b73fa99bbb8e
Revises: 5a9366f70df8
Create Date: 2023-12-10 11:48:42.298090

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b73fa99bbb8e'
down_revision = '5a9366f70df8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('cars',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('car_type', sa.String(length=255), nullable=False),
    sa.Column('make', sa.String(length=255), nullable=False),
    sa.Column('model', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('cars')
    # ### end Alembic commands ###