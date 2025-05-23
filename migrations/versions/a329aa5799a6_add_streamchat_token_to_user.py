"""Add streamchat token to user

Revision ID: a329aa5799a6
Revises: 0d9057d435ef
Create Date: 2024-04-13 12:15:50.736941

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a329aa5799a6'
down_revision = '0d9057d435ef'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('streamchat_token', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('streamchat_token')

    # ### end Alembic commands ###
