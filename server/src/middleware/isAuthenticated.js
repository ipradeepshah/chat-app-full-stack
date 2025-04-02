import jwt from "jsonwebtoken";



const isAuthenticated = async(req, res, next) => {
    try {
        //taking cookie from user
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: "User not Authenticated"})
        }
        //checking the token
        const decode =await jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        
        if (!decode) {
            return res.status(401).json({message: 'Invalid Token'});
        }
        //sending id to the next router /logout
        req.id = decode.userId; 
        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal Failure'})
    }
};

export default isAuthenticated;

