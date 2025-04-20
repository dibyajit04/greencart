const mongoose =require ("mongoose")

const connectDb=async ()=>{
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        //console.log(conn)
        console.log(`MONGO CONNECTED:${conn.connection.host}`)
    }
    catch(error)
    {console.log(`ERROR:${error.message }`)
}
}

module.exports = connectDb;

