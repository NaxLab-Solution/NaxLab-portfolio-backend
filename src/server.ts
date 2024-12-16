
import app from './app';
import config from './app/config';
import {Server} from 'http'
import { connection } from './app/dbcontext/context';


//Listing
const server:Server = app.listen(config.port || 4000, () => {
  console.log(`Server is running on http://localhost:${config.port}`)
})

//DB Connection
connection();

// Handling unhandled promise rejection
process.on('unhandledRejection',()=>{
  console.log('UnhandleRejection is detected, shutting the server')
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  }
  process.exit(1)
})


//handling uncaught exceptions
process.on('uncaughtException',()=>{
  console.log('UncaughtException is detected, shutting the server')
  process.exit(1)
})


//Handling warning 
process.on('warning',(warn)=>{
  console.log(`WARNING: ${warn.message}`)
  
})