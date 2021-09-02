const generateMessage =(text,username)=>{

    return {
        text:text,
        username:username,
        createdAt :new Date().getTime()
    }
};

const generateLocationMessage =(url,username)=>{

    return {
        url:url,
        username:username,
        createdAt : new Date().getTime()

    }



};


module.exports = {
    generateMessage,
    generateLocationMessage
};