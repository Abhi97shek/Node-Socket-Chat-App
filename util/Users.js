const users = [];

const addUser = ({id,username,room})=>{

    // Clean the Code
    username = username.trim().toLowerCase();
    room = room.trim().toLowerCase();

    // Validate the username and the Room

    if(!username || !room)
    {   
            return {
                error:"Please Provide the Username and the Room Id!"
            }
    }

    // Checking for the Existing User

    const existingUser = users.find((user)=>{

        return user.room === room && user.username === username;
    });

    if(existingUser)
    {
        return {
            error:"This Username Already Exists!"
        }
    }
    
    // Storing User

    const user = {id,username,room};

    users.push(user);

    return {user};


};

const removeUser = (id)=>{

    const index = users.findIndex((user)=>{

        return user.id === id;
    });


    if(index !== -1)
    {
        return users.splice(index,1)[0];
    }

};


const getUser = (id)=>{
     return users.find((user)=>{
        return user.id === id;
     });


};


const getUserInRoom =(room)=>{

    room =room.trim().toLowerCase();
        return users.filter((user)=>{

                return user.room === room;
        });

};



module.exports ={

    addUser,
    removeUser,
    getUser,
    getUserInRoom


};