import { v4 as uuidv4 } from 'uuid';
import {Tuser} from './types'; 
let users: Tuser[] = [];

export function usernameAvailable(username: string, clientID:string):boolean {
  if (!users) return !!username;
  if (!users.some((user: Tuser) => username === user.username)) {
    addUser(username, clientID); 
    return true; 
  }
  console.log('users',users);
  return false;
}

export function addUser(username:string,clientID:string):void{
  users.push({username, clientID, messages:[]});
}
export function removeUsername(clientID:string):void{
  users = users.filter((user:Tuser) => user.clientID !== clientID)
}
export function getData():Tuser[]{
  return users;
};  
export function addMessageToUser(username:string, message:string):void {
  const updatedArr = users.map((user:Tuser) => {
    if(user.username === username) {
      const newMessage = {
        id:uuidv4(),
        message,
        time:Date.now()
      }
      user.messages = [...user.messages, newMessage]
    }
    return user; 
  });
  console.log('updatedMessage', updatedArr);
  users = updatedArr; 
}

