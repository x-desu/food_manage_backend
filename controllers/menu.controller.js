import Menu from "../models/menu.model.js"

export const getAllMenu = async(req,res,next)=>{
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 4
    const search = req.query.search || '';
    const sort = req.query.sort
    const {category} = req.query
    let sortQuery = {}
    console.log(category)
    switch (sort) {
        case 'name-asc':
            sortQuery = { name: 1 }; 
            break;
        case 'name-desc':
            sortQuery = { name: -1 }; 
            break;
        case 'price-asc':
            sortQuery = { price: 1 }; 
            break;
        case 'price-desc':
            sortQuery = { price: -1 }; 
            break;
        default:
            sortQuery = { name: -1 }; 
    }
    const query = {}
    if(search){
        query.name = {$regex :search,$options:'i'}
    }   
    if(category){
        query.category={$regex:category,$options:'i'}
    }
    try {
        const menu = await Menu.find(query)
        
        .sort(sortQuery)
        .skip((page-1) * limit)
        .limit(limit)
        
        const totalMenu = await Menu.countDocuments(query)
        
        res.status(200).json({
            data:menu,
            total:totalMenu,
            page,
            limit
        })
        console.log(query,menu)
    } catch (error) {
        res.status(500).json({error:"No menu items found!"})
    }
}

export const getMenuItem = async(req,res,next)=>{
        try {
            const {id} = req.params
            const menuItem = await Menu.findById(id)
            if(!menuItem){
                res.status(404).json({error:"No item found!"})
            }
            res.status(200).json(menuItem)
        } catch (error) {
            res.status(500).json({error:"No item found!"})
        }
}

export const postMenu = async(req,res,next) => {
    const role = req.auth.role

    if(role!=='admin'){
       return res.status(401).json({ error: 'Unauthorized' });
    }
    try {
        const {name,image,price,stock,category} = req.body
        
        const newMenuItem = new Menu({
            name,
            image,
            price,
            stock,
            category
        })
        await newMenuItem.save()
        res.status(200).json(newMenuItem)
    } catch (error) {
        res.status(500).json({ error: 'Failed to add menu item' });
    }
}

export const updateMenuItem = async(req,res,next) => { 
    try {
        const {id} = req.params
        const upadtedData = req.body
        console.log(upadtedData)
        const updatedMenuItem = await Menu.findByIdAndUpdate(id,upadtedData,{new:true})
        if (!updatedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
          }
          res.status(200).json(updatedMenuItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update menu item' })
    }
}

export const deleteMenuItem = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedMenuItem = await Menu.findByIdAndDelete(id)
      if (!deletedMenuItem) {
        return res.status(404).json({ error: 'Menu item not found' })
      }
      res.status(200).json({ message: 'Menu item deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete menu item' })
    }
  };