from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models import User
from app import db

user_bp = Blueprint('user', __name__)

@user_bp.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    user_id = get_jwt_identity()
    with Session(db.engine) as session:
        user = db.session.get(User, int(user_id))
        if not user:
            return jsonify({'message': 'User not found'}), 404

        return jsonify({
            'name': user.name,
            'email': user.email,
            'phone': user.phone
        }), 200
