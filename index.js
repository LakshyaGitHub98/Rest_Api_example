const express=require('express');
const app=express();
const fs=require('fs');
const port=8000;
const users=require('./MOCK_DATA.json');
const { log } = require('console');
// Middleware
app.use(express.urlencoded({extended:false}));

// app.use((req,res,next)=>{
//     console.log("Hello from middleware");   
//     // return res.json({msg:"Hello from middleware"})
//     next();
// });
// app.use((req,res,next)=>{
//     console.log("Another middleware");
//     return res.end('Hello from another middleware');
// });

// Routes
app.route('/api/users').get((req,res)=>{
    return res.json(users);
}).post((req,res)=>{
    const newUser=req.body;
    newUser.id = users.length + 1; // Assign a new ID based on the current length of the array
    users.push(newUser);
    // log('New User:', newUser);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err,data) =>   {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send('Internal Server Error');
        }
        return res.json({staus:"Sucessefully added",id:newUser.id});
    });
}).patch((req,res)=>{
    // TODO: Implement PATCH method to update a user
    return res.status(501).send('Not Implemented');
}).delete((req,res)=>{
    // TODO: Implement DELETE method to delete a user
    return res.status(501).send('Not Implemented');
});  
app.get('/users',(req,res)=>{
    const html=`
    <html>
    <head>
        <title>Users</title>
        </head>
        <body>
            <h1>Users</h1>
            <ul>
                ${users.map(user=>`<li>${user.first_name} ${user.last_name}</li>`).join('')}
            </ul>
        </body>
    </html>
    `;
    return res.send(html);
});
app.get('/api/users/:id',(req,res)=>{
    res.setHeader('My Name:',"Lakshya Tripathi");
    const userId=parseInt(req.params.id,10);
    const user=users.find(u=>u.id===userId);
    if(!user){
        return res.status(404).send('User not found');
    }
    return res.json(user);
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

