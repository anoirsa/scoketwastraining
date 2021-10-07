

const addUser = (users , {userId , username, joinedRoomId}) => {
    if (!userId || !username ) return {error : "Username or userId don't have to be empty"}
    const userFound = users.find((user) => user.username == username)
    if (userFound) {
        const roomFound = userFound.rooms.find((r) => r.roomId === joinedRoomId) 
        if (roomFound) {
            return {userBeen : true}
        }
        userFound.rooms.push({roomId : joinedRoomId, messages : []});
        return {user : userFound}
    }
    
    joinedRoomId = joinedRoomId.trim().toLowerCase();
    var rooms = [];
    const newRoom = {roomId : joinedRoomId , messages : []}
    rooms.push(newRoom);
    username = username.trim().toLowerCase();
    const newUser = {userId, username, rooms}
    users.push(newUser);
    return {user : newUser}
}

const getUser = (array , username) => {
    const foundUser = array.find((user) => user.username ==  username);
    if (!foundUser) return {error : 'Error type 700, No such as a used was found'}
    return {user : foundUser}
}

// Ready to debug

const sendFilterMessage = ({users , text , room , sender, receiver, username, rooms, userBeen}) => { 
    // Debug
    console.log("Has user been before " + userBeen )

    //
    var generalRoom = rooms.find((value) => value.roomId === room);
    if (!generalRoom) {
        rooms.push({roomId : room , receivers : []})
        generalRoom = rooms.find((value) => value.roomId === room);
    }
    var generalReceivers = generalRoom.receivers;
    if (!generalReceivers.includes(receiver)) {
        generalReceivers.push(receiver);
    }
    var message = 
        {
            sender,
            text 
        }
    
    var roomOfUser = null;
    generalReceivers.forEach((receiverI , index) => {
        var user = users.find((u, i) => u.username === receiverI);
        var roomF = user.rooms.find((r , i) => r.roomId === room); 
        if (!userBeen) {
            roomF.messages.push(message)
        } 
        if (receiverI === username) {
            roomOfUser = roomF
        }
    });
        console.log("All users and rooms")
        users.forEach((value) => {
        console.log("Username is " + value.username)    
        value.rooms.forEach((v) => {
            if (v.roomId === room) {
                console.log(v.messages)
            }
        })
    })
    console.log("Room fs user " + username )
    console.log(roomOfUser);
    //

    // return roomOfUser.messages;

}

const findMessages = ({users ,username , room}) => {
    console.log('inside function username' + username)
    console.log('inside function room' + room)
    console.log(users)
    var user = users.find((u, i) => u.username === username);
    var roomF =  user.rooms.find((r , i) => r.roomId === room);
    return roomF.messages;
}


// Debug

module.exports = {addUser, getUser, sendFilterMessage, findMessages}