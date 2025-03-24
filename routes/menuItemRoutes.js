const express = require("express");
const router = express.Router();
const menuItem = require("../models/menu");

router.post("/", async(req, res) => {
    try{
        const data = req.body;;
        const newMenu = new menuItem(data);
        const response = await newMenu.save();
        console.log('data saved');
        res.status(200).send(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/", async (req, res) => {
    try{
        const data = await menuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/:taste", async(req, res) => {
    try{
        const taste = req.params.taste;
        if(taste === 'sweet' || taste === 'sour' || taste === 'spicy'){
            const response = await menuItem.find({taste: taste});
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            res.status(400).json({error: 'Invalid taste'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const updatedMenuData = req.body;

        const response = await menuItem.findByIdAndUpdate(menuId, updatedMenuData, {
            new:true,
            runValidators:true
        })

        if(!menuId){
            res.status(400).json({error: 'Menu ID not found'});
        }

        console.log('data updated');
        res.status(200).json(response);
        
    } catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:id', async(req, res) => {
    try{
        const menuId = req.params.id;
        const response = await menuItem.findByIdAndDelete(menuId);
        console.log('data deleted');
        res.status(200).json({message: 'Data deleted successfully'});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// comment added for testing purpose
module.exports = router;