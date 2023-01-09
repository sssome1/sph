import { v4 as uuidv4 } from 'uuid';


export const getUUID = () => {
    let uuid = localStorage.getItem('UUID')
    if (!uuid) {
        uuid = uuidv4()
        localStorage.setItem('UUID', uuid)
    }
    console.log(uuid);
    return uuid
}