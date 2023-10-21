let users = []      //{room, username,id}

export const addUser = (room, username, id) => {
    console.log("adding user ", {room,username,id})
    username = username?.trim().toLowerCase()
    room = room?.trim().toLowerCase()

    const existingUser = users.find(user => user.room === room && user.username === username)
    if(existingUser){
        return {
            error: "user already exists in this database"
        }
    }
    
    const user = {
        id,
        username,
        room
    }

    users.push(user)
    return {user}
}

export const getUser = (id) => {
    const user = users.find(user => user.id === id)
    return user
}

export const getUsersInRoom = (room) => {
    return users.filter(user => user.room === room)
}

export const removeUser = (id) => {
    const user = users.find(user => user.id === id)
    users = users.filter(user => user.id !== id)
    return user
}