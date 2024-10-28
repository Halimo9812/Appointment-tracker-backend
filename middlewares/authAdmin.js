import jwt from 'jsonwebtoken'


//Admin Auth middleware//

const authAdmin = async (req,res,next) => {
    try {
        const {atoken} = req.headers

        if (!atoken){
            return res.status(500).json({ message: 'Login not Authorized' });
        }

        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return  res.status(500).json({ message: 'Login not Authorized, try again' });
        }
        
    } catch (error) {
        console.error(error); //log error 
        res.status(500).json({ message: 'Server Error' });
    }
}

export default authAdmin;