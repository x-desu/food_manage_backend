import jwt from 'jsonwebtoken'

export const authMiddleware = (req,res,next) => {
    const token = req.cookies.token
    if(!token){
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        req.auth = decoded
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Not authorized, no token' });
    }
}