import io from "./server"

const socket = io('http://localhost:3000')

socket.on("chat-message", data =>{

    console.log(data)
}

)
export default io