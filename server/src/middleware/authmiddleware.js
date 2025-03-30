import jwt from "jsonwebtoken";
const verifyLogin = async(req, res, next) => {
    try {
        //taking cookie from user
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({message: "No Token Found"})
        }
        //checking the token
        const verifyToken =await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifyToken)
        if (!verifyToken) {
            return res.status(401).json({message: 'Invalid Token'})
        }
        //sending id to the next router /logout
        req.id = verifyToken.userId 
        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: 'Internal Failure'})
    }
};

export default verifyLogin;

