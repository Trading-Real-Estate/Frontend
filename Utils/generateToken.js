import jwt from 'jsonwebtoken'

const generateToken = (userId) =>{
    const token = jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn: '1d',
    })
return token
    // res.cookie('jwt', token,{
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite:'strict',
    //     maxAge: 1 *24 * 60 * 60 * 1000
    // })
}

export default generateToken