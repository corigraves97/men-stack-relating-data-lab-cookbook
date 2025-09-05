const express = require('express')
const router = express.Router()

const User = require('../models/user')

module.exports = router

router.get('/', async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id)
    console.log(currentUser.pantry)
    res.render('foods/index.ejs', {
        pantry: currentUser.pantry,
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
})

router.get('/new', (req, res) => {
    res.render('foods/new.ejs')
})

router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.push(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.delete('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.pantry.id(req.params.pantryId).deleteOne()
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.get('/:pantryId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const pantryItem = currentUser.pantry.id(req.params.pantryId)
        res.render('foods/edit.ejs', {
            pantryItem,
        })
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
})

router.put('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const pantry = currentUser.pantry.id(req.params.pantryId)
        pantry.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods`)
    } catch (error){
        console.log(error)
        res.redirect('/')
    }
})

router.post('/:pantryId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        const pantry = currentUser.pantry.id(req.params.pantryId)
        pantry.set(req.body)
        await currentUser.save()
        res.redirect(`/users/${currentUser._id}/foods/${req.params.pantryId}`)
    } catch (error) {
        console.log(error)
        res.redirect('/')
    }
}) 