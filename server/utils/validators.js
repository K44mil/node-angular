const Role = require('../models/Role');

exports.validateUser = (user) => {
    // @@@ Validate Email
    // Required:
    if (!user.email || user.email === '')
        return validationError('Email is required.');
    
    // Pattern:
    if (!user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
        return validationError('Please provide valid email.');

    // @@@ Validate First Name
    // Required:
    if (!user.firstName || user.firstName === '')
        return validationError('First Name is required.');
    
    // Pattern:
    if (!user.firstName.match(/^[a-zA-Z]+$/))
        return validationError('First Name cannot contains any special characters or digits.');

    // Length:
    if (user.firstName.length > 30)
        return validationError('First Name cannot be longer than 30 characters.');

    // @@@ Validate Last Name
    // Required:
    if (!user.lastName || user.lastName === '')
        return validationError('Last Name is required.');
    
    // Pattern:
    if (!user.lastName.match(/^[a-zA-Z]+$/))
        return validationError('Last Name cannot contains any special characters or digits.');

    // Length:
    if (user.lastName.length > 30)
        return validationError('Last Name cannot be longer than 30 characters.');
    
    // @@@ Validate Password
    // Required:
    if (!user.password || user.password === '')
    return validationError('Password is required.');

    // Pattern:
    if (!user.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/))
        return validationError('The password must be at least 8 characters long and maximum 16 characters long, contains upper and lower case letters, a number and a special character.');

    // @@@ Validate Confirm Password
    // Required:
    if (!user.confirmPassword || user.confirmPassword === '')
        return validationError('Confirm Password is required.');

    // Pattern:
    if (user.password !== user.confirmPassword)
        return validationError('Passwords must be the same.');

    // @@@ Validate role
    // Required:
    if (!user.role)
        return validationError('Role is required.');

    // Pattern:
    if (user.role !== Role.User && user.role !== Role.Student)
        return validationError('Please provide valid role.');
    
    // @@@ Validate Album Number [role === Role.Student] 
    if (user.role === Role.Student) {
        // Required:
        if (!user.albumNumber || user.albumNumber === '')
            return validationError('Album Number is required.');
        
        // Pattern:
        if (!user.albumNumber.match(/^[0-9]{6}$/))
            return validationError('Album number must consist of exacly 6 digits.');
    }

    return { success: true };
};

validationError = (message) => {
    return {
        success: false,
        message: message
    };
};