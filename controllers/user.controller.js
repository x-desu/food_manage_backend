import User from "../models/user.model.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ImageKit from 'imagekit'

export const register = async(req,res,next) => {
    try {
        const {name,email,password} = req.body
    
            if(!name){
               return res.status(403).json({error:"name is required"})
            }
            if(!password){
               return res.status(403).json({error:"password is required"})
            }
    
            const isEmailValid = await User.findOne({email})
            if(isEmailValid){
               return res.status(401).json({error:"User with email already exists!"})
            }
    
            const user = new User({
                name,
                email,
                password
            })
            await user.save()
            res.status(200).json({message:"Registered successfully"})
        } catch (error) {
            console.log(error)
            res.status(500).json({error:"Registration failed"})
        }
}

export const login = async(req,res,next) => {
    try {
        const {email,password} = req.body
        if(!email){
            return res.status(403).json({error:"email is required"})
        }
        if(!password){
            return res.status(403).json({error:"password is required"})
        }
        
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(404).json({error:"User not found"})
        }
        const isPassValid = await bcrypt.compare(password,user.password)
        console.log(isPassValid,password)
        if(!isPassValid){
            return res.status(402).json({error:"password is not valid"})
        }
        
        const token = jwt.sign(
            {email:user.email, id:user._id, name:user.name,avatar: user.image,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'1d'}
        )

        // Set cookie options
        const cookieOptions = {
            httpOnly: true, // Prevents client-side access to the cookie
            secure: process.env.NODE_ENV === 'production', // Use secure in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        }

        // Send single response with both cookie and json
        return res
            .cookie('token', token, cookieOptions)
            .status(200)
            .json({
                message: "login successful",
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    avatar: user.image,
                    role:user.role
                }
            });

    } catch (error) {
        console.log(error)
        res.status(500).json({error:"login failed"})
    }
}

export const getAuth = (req,res,next) =>{
    const token = req.cookies.token
    
    if(!token){
        return res.status(401).json({isAuth:false})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        res.status(200).json({isAuth:true,user:decoded})
    } catch (error) {
        res.status(401).json({isAuth:false})
    }
}

const imagekit = new ImageKit({
    urlEndpoint: process.env.IK_URL_ENDPOINT,
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY
  });

export const imageKit = async(req,res,next) => {

    const result = imagekit.getAuthenticationParameters()
    res.send(result)
}


export const logout = (req,res,next) => {
    // Clear the JWT cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict', 
      path: '/', 
    });
  
    res.send('Logout successful');
  };

export const updateName = async (req, res) => {
  try {
    const { name, id } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    ).select('-password');

    // Create new token with updated user info
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name, avatar: user.image,role:user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    };

    // Send response with new cookie and updated user
    res
      .cookie('token', token, cookieOptions)
      .json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.image,role:user.role } });

  } catch (error) {
    res.status(500).json({ error: 'Failed to update name' });
  }
};

export const updateImage = async (req, res) => {
  try {
    const { image, id } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      { image: image },
      { new: true }
    ).select('-password');
    console.log(user,image)
    // Create new token with updated user info
    const token = jwt.sign(
      { email: user.email, id: user._id, name: user.name, avatar: user.image,role:user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    };

    // Send response with new cookie and updated user
    res
      .cookie('token', token, cookieOptions)
      .json({ user: { id: user._id, name: user.name, email: user.email, avatar: user.image,role:user.role } });

  } catch (error) {
    res.status(500).json({ error: 'Failed to update image' });
  }
};