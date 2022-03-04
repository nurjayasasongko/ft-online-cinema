const express = require('express')
const { register, login } = require('../controllers/auth')
const { getCategories } = require('../controllers/category')
const { createFilm, getFilmById, getAllFilms, editFilm, deleteFilm } = require('../controllers/film')
const { getProfile, getMyFilm, getUser, deleteUser, editProfile } = require('../controllers/user')
const { buyFilm, getTransactions, updateStatusTransaction } = require('../controllers/userFilm')
const { auth, isAdmin } = require('../middlewares/admin')
const uploadImage = require('../middlewares/uploadImage')

const router = express.Router()

//auth
router.post('/register', register)
router.post('/login', login)

// films
router.post('/film', auth, isAdmin, uploadImage, createFilm)
router.get('/film/:id', auth, getFilmById)
router.get('/film', getAllFilms)
router.post('/film/:id', auth, uploadImage, buyFilm)
router.patch('/film/:id', auth, isAdmin, uploadImage, editFilm)
router.delete('/film/:id', auth, isAdmin, deleteFilm)

// categories
router.get('/category', getCategories)

// profiles
router.get('/users', getUser)
router.delete('/user/:id', deleteUser)
router.get('/profile', auth, getProfile)
router.patch('/profile', auth, uploadImage, editProfile)

// transactions
router.get('/transactions', auth, isAdmin, getTransactions)
router.patch('/transaction/:id', auth, isAdmin, updateStatusTransaction)
router.get('/my-films', auth, getMyFilm)

module.exports = router
