const socket=io();


const $sendMessage =document.querySelector('#sendMessage');
const $location =document.querySelector('#sendLocation');
const $MessageForm =document.querySelector('input');
const $messageDiv =document.querySelector("#chat-message");
const btn = document.querySelector('#message-info');

const $sidenav = document.querySelector('#chat__sidebar');

// Template

const messageTemplate = document.querySelector('#message-template').innerHTML;

const locationMessageTemplate =document.querySelector('#location-message-template').innerHTML;

const UserList =document.querySelector('#sidebar-template').innerHTML;

// Options

const {username , room}=Qs.parse(location.search,{ignoreQueryPrefix:true});


// console.log(messageTemplate);

socket.on("message",(data)=>{

    console.log(data);
    const html = Mustache.render(messageTemplate,{
                user :data.username,
                message : data.text,
                createdAt : moment(data.createdAt).format('h:mm a')
    });

    $messageDiv.insertAdjacentHTML('beforeend',html);
});

    socket.on('locationMessage',(url)=>{

        console.log(url);
        const html = Mustache.render(locationMessageTemplate,{
            url,
            user : url.username,
            createdAt: moment(data.createdAt).format('h:mm a')
        });

        $messageDiv.insertAdjacentHTML('beforeend',html);

    });


    socket.on('roomData',({room,users})=>{

        
        console.log(room);
        console.log(users);

        const html =Mustache.render(UserList,{
            room:room,
            users:users


        });

       document.querySelector('#sidebar').innerHTML = html;
    })


socket.emit('join',{username,room},(error)=>{


    if(error)
    {
        alert(error);
        location.href ="/";
    }

});




btn.addEventListener('submit',(e)=>{

    e.preventDefault();
    // e.preventDefault();

    $sendMessage.setAttribute('disabled','disabled');
    const message = e.target.elements.message.value;

    socket.emit("sendMessage",message,(error)=>{

        $sendMessage.removeAttribute('disabled');
        $MessageForm.value = ' ';
        $MessageForm.focus();

        console.log("message has been Deleivered" + error);
    });
});





document.querySelector('#sendLocation').addEventListener('click',()=>{


    $location.setAttribute('disabled','disabled');


    if(!navigator.geolocation)
    {
        return alert("Geolocation is not Supported by the Browser");
    }

    navigator.geolocation.getCurrentPosition((position)=>{

        console.log(position);
        const location ={
               lati:position.coords.latitude,
               long :position.coords.longitude 

        };
        socket.emit("sendLocation",location,(response)=>{

            console.log(response);
            $location.removeAttribute('disabled');
        });
    });

});





