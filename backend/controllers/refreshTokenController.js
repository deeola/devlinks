
const User = require('../model/User');
const jwt = require('jsonwebtoken');
// require('dotenv').config();


// const handleRefreshToken = async (req, res) => {
//     const cookies = req.cookies;
//     console.log(cookies)
//     if (!cookies?.jwt) return res.sendStatus(401);
//     const refreshToken = cookies.jwt;
//     res.clearCookie('jwt', { httpOnly: true, sameSite: 'None' });

//     const foundUser = await User.findOne({ refreshToken }).exec();

//     // Detected refresh token reuse!
//     if (!foundUser) {
//         jwt.verify(
//             refreshToken,
//             process.env.REFRESH_TOKEN_SECRET,
//             async (err, decoded) => {
//                 if (err) return res.sendStatus(403); //Forbidden
//                 console.log('attempted refresh token reuse!')
//                 const hackedUser = await User.findOne({ username: decoded.username }).exec();
//                 hackedUser.refreshToken = [];
//                 const result = await hackedUser.save();
//                 console.log(result);
//             }
//         )
//         return res.sendStatus(403); //Forbidden
//     }

//     const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

//     // evaluate jwt 
//     jwt.verify(
//         refreshToken,
//         process.env.REFRESH_TOKEN_SECRET,
//         async (err, decoded) => {
//             if (err) {
//                 console.log('expired refresh token')
//                 foundUser.refreshToken = [...newRefreshTokenArray];
//                 const result = await foundUser.save();
//                 console.log(result);
//             }
//             if (err || foundUser.username !== decoded.username) return res.sendStatus(403);

//             // Refresh token was still valid
//             const accessToken = jwt.sign(
//                 {
//                     "UserInfo": {
//                         "username": decoded.username
//                     }
//                 },
//                 process.env.ACCESS_TOKEN_SECRET,
//                 { expiresIn: '45s' }
//             );

//             const newRefreshToken = jwt.sign(
//                 { "username": foundUser.username },
//                 process.env.REFRESH_TOKEN_SECRET,
//                 { expiresIn: '1d' }
//             );
//             // Saving refreshToken with current user
//             foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
//             const result = await foundUser.save();

//             // Creates Secure Cookie with refresh token
//             res.cookie('jwt', newRefreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });

//             res.json({ accessToken })
//         }
//     );
// }


const handleRefreshToken = (req, res) => {
    const cookies = req.cookies

    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' })

    const refreshToken = cookies.jwt

    console.log('refreshToken: ', refreshToken)

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })

            const foundUser = await User.findOne({ username: decoded.username }).exec()

            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15m' }
            )

            res.json({ "accessToken": accessToken, username:decoded.username })
        }
    )
}

module.exports = { handleRefreshToken }