const express=require('express');
const router=express.Router();
const {handleGetAllUsers,handleCreateUsers,handleGetUserById, handleUpdateUserbyId,handleDeleteUserbyId}=require('../controllers/user');
// Routes
router.route('/')
    .get(handleGetAllUsers)
    .post(handleCreateUsers)
    .patch((req, res) => {
            return res.status(501).send('Not Implemented');
        })
    .delete((req, res) => {
            return res.status(501).send('Not Implemented');
        });

router.route('/:id')
    .get(handleGetUserById)
    .patch(handleUpdateUserbyId)
    .delete(handleDeleteUserbyId);
 module.exports = router;    

 // router.get('/', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <html>
//     <head>
//         <title>Users</title>
//     </head>
//     <body>
//         <h1>Users</h1>
//         <ul>
//             ${allDbUsers.map(user => `<li>${user.firstName} ${user.lastName}</li>`).join('')}
//         </ul>
//     </body>
//     </html>
//     `;
//     return res.send(html);
// });
  