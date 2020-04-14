import { useReducer } from 'react';
import openSocket from 'socket.io-client'
import { page, pages } from '.';

export const useConnection = master => {
    const socket = openSocket(`wss://t4nymqstf5.execute-api.eu-west-2.amazonaws.com/beta`)
    
    const [state, update] = useReducer(page, pages[0])

    socket.on("message", data => {
        update({ type: data })
    })

    const command = data => master && socket.emit("message", data)

    return {
        state,
        command
    }

}



