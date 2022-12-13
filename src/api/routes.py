"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, json
from api.models import db, User, Fav_Users
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)


@api.route('/users', methods=['GET'])
def get_users():
 
    users = User.query.all()
    userlist = []
    for user in users:
        userlist.append(user.serialize())
 

    return jsonify(userlist), 200



@api.route('/users', methods=['POST'])
def add_user():
    data = request.data
    data = json.loads(data)
    new_user = User(
        email = data["email"],
        password = data["password"],
        is_active = data["is_active"]
    )
    db.session.add(new_user)
    db.session.commit()
    response_body = {
        "msg": "user añadido"
    }
    return jsonify(response_body), 200





@api.route('/fav-users', methods=['POST'])
def add_fav_user():
    id_user = request.json.get("user_id", None)
    
    fav_user = User.query.filter_by(id=id_user).first()
    new_fav_user = Fav_Users(
        user_id = fav_user.id
    )
    db.session.add(new_fav_user)
    db.session.commit()
    response_body = {
            "msg": "user añadido"
        }
    return jsonify(response_body), 200



@api.route('/fav-users', methods=['GET'])
def get_fav_users():
    fav_users = Fav_Users.query.all()
    fav_users_list = []
    for fav_user in fav_users:
        fav_users_list.append(fav_user.serialize())
    return jsonify(fav_users_list), 200




@api.route('/fav-users', methods=['DELETE'])
def delete_fav_user():
    id_fav_user = request.json.get("fav_user_id", None)
    
    fav_user = Fav_Users.query.filter_by(id=id_fav_user).first()
    print(fav_user)
    
    db.session.delete(fav_user)
    db.session.commit()
    response_body = {
            "msg": "fav user borrado"
        }
    return jsonify(response_body), 200


@api.route('/users', methods=['DELETE'])
def delete_user():
    id_user = request.json.get("user_id", None)
    
    user = User.query.filter_by(id=id_user).first()
    print(user)
    
    db.session.delete(user)
    db.session.commit()
    response_body = {
            "msg": "user borrado"
        }
    return jsonify(response_body), 200



@api.route('/login', methods=['POST'])
def handle_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password).first()
    if  user == None:
        return jsonify({"msg": "usuario o password incorrecto"}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({"token": access_token, "user_id": user.id}), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def handle_private():
    current_user_id = get_jwt_identity()
    
    user = User.query.get(current_user_id)
    return jsonify({"id":user.id, "email": user.email})


@api.route('/signup', methods=['POST'])
def add_user_signup():
    data = request.data
    data = json.loads(data)
    new_user = User(
        email = data["email"],
        password = data["password"],
        is_active = data["is_active"]
    )
    db.session.add(new_user)
    db.session.commit()
    response_body = {
        "msg": "user añadido!"
    }
    return jsonify(response_body), 200




