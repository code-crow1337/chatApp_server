
export type Tuser = {
  username:string,
  clientID:string,
  messages:Tmessage[],
}

type Tmessage = {
  id:string,
  message:string,
  time:number, 
}
