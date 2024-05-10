// import jwt from 'jsonwebtoken';

// const secret = process.env.JWT_SECRET;

// export const authenticated = (fn) => async (req, res) => {
//   try {
//     const token = req.cookies.token;
//     if (!token) {
//       res.status(401).json({ message: 'No token provided' });
//       return;
//     }
//     const decoded = jwt.verify(token, secret);
//     req.userId = decoded.userId;

//     return await fn(req, res);
//   } catch (error) {
//     res.status(401).json({ message: 'Unauthorized' });
//   }
// };

// export const someProtectedRoute = authenticated((req, res) => {
//   res.status(200).json({ message: `Hello user ${req.userId}` });
// });
