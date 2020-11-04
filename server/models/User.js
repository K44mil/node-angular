const { sequelize } = require('../config/db');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class User extends Model {
    async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }

    async comparePassword(password) {
        return await bcrypt.compare(password, this.password);
    }

    getSignedJwtToken() {
        return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
    }

    without(...properties) {
        const object = Object.assign({}, this.get());
        for (const p of properties) {
            if(object.hasOwnProperty(p))
                delete object[p];
        }
        return object;
    }

    toJSON() {
        const object = Object.assign({}, this.get());
        
        delete object.password;

        return object;
    }
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING(256),
        allowNull: false,
        unique: true,
        validate: {
            is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        }
    },
    password: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'student', 'admin'),
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_verified'
    },
    isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_blocked'
    },
    firstName: {
        type: DataTypes.STRING(256),
        allowNull: false,
        field: 'first_name'
    },
    lastName: {
        type: DataTypes.STRING(256),
        allowNull: false,
        field: 'last_name'
    },
    albumNumber: {
        type: DataTypes.STRING(6),
        allowNull: true,
        unique: true,
        field: 'album_number'
    },                   
    avatar: {              
        type: DataTypes.STRING(256),
        allowNull: true,
        unique: true                                                                                                                                                                                                                  
    },
    resetPasswordToken: {
        type: DataTypes.STRING(256),
        allowNull: true,
        field: 'reset_password_token'
    },
    resetPasswordExpire: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'reset_password_expire'
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;