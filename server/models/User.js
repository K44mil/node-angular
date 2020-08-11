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
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('user', 'student'),
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    firstName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    albumNumber: {
        type: DataTypes.STRING(6),
        allowNull: true,
        unique: true
    }
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users'
});

module.exports = User;