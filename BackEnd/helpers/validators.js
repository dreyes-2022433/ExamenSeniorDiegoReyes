import { body, param } from "express-validator";
import { validateErrors } from "./validate.error.js";


export const addUserValidator = [
    body('name', 'Name is required to be at least 2 characters long').notEmpty().isLength({ min: 2 }),
    body('lastname', 'Lastname is required to be at least 2 characters long').notEmpty().isLength({ min: 2 }),
    body('email', 'Email is required').notEmpty().isEmail(),
    body('password', 'Password is required')
    .notEmpty()
    .isStrongPassword()
    .withMessage('Password must be strong')
    .isLength({ min: 6 }),
    validateErrors
]

export const updateUserValidator = [
    param('id', 'Invalid user ID').isMongoId(),
    body('name', 'Name is required to be at least 2 characters long').optional().notEmpty().isLength({ min: 2 }),
    body('lastname', 'Lastname is required to be at least 2 characters long').optional().notEmpty().isLength({ min: 2 }),
    body('email', 'Email is required').optional().notEmpty().isEmail(),
    body('password', 'Password is required')
    .optional()
    .isStrongPassword()
    .withMessage('Password must be strong')
    .isLength({ min: 6 }),
    validateErrors
]

export const deleteUserValidator = [
    param('id', 'Invalid user ID').isMongoId(),
    validateErrors
]