
const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('../models/todoModel.js');
const { createWorkout, getWorkouts, getWorkout, deleteWorkout, updateWorkout } = require('../controllers/workoutController.js');

const router = express.Router();

/**
 * Route: /api/workouts
 * Method: GET
 * Description: Get all workouts
 */
router.get('/', getWorkouts);


/**
 * Route: /api/workouts/:id
 * Method: GET
 * Description: Get a single workout by ID
 */
router.get('/:id', getWorkout);


/**
 * Route: /api/workouts
 * Method: POST
 * Description: Create a new workout
 */
router.post('/' , createWorkout);


/**
 * Route: /api/workouts/:id
 * Method: DELETE
 * Description: Delete a workout by ID
 */
router.delete('/:id', deleteWorkout);


/**
 * Route: /api/workouts/:id
 * Method: PATCH
 * Description: Update a workout by ID
 */
router.patch('/:id', updateWorkout);

module.exports = router;