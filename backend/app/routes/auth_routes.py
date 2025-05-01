from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from app.models import User
from app import db
from flask_jwt_extended import create_access_token
from sqlalchemy import select
from sqlalchemy.orm import Session

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    with Session(db.engine) as session:
        existing_user = session.scalar(select(User).where(User.email == data['email']))
        if existing_user:
            return jsonify({'message': 'Email already registered'}), 400

        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone'],
            password=hashed_password
        )
        session.add(new_user)
        session.commit()

    return jsonify({'message': 'Signup successful'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    with Session(db.engine) as session:
        user = session.scalar(select(User).where(User.email == data['email']))
        if not user or not check_password_hash(user.password, data['password']):
            return jsonify({'message': 'Invalid credentials'}), 401

        token = create_access_token(identity=str(user.id))
        return jsonify({'token': token}), 200
