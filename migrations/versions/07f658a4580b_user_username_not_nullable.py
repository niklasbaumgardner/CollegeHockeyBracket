"""User.username not nullable

Revision ID: 07f658a4580b
Revises: e2d3fad419b5
Create Date: 2023-02-05 11:28:09.746068

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '07f658a4580b'
down_revision = 'e2d3fad419b5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'username',
               existing_type=sa.VARCHAR(length=60),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('user', 'username',
               existing_type=sa.VARCHAR(length=60),
               nullable=True)
    # ### end Alembic commands ###
