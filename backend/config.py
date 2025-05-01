import datetime
import os



class Config:
    SQLALCHEMY_DATABASE_URI = os.environ.get("DATABASE_URL") or 'sqlite:///users.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get("SECRET_KEY") or 'your_secret_key'
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(days=1)
