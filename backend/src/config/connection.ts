import mongoose, { mongo } from "mongoose"

async function connectionDB() {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`mongo db connection established : ${connect.connection.host}`)
    } catch (error) {
        console.log(error)
        throw new Error ("Cannot connect to mongoDB")
    }
}


async function disconnectDB() {
    try {
        await mongoose.disconnect()
    } catch (error) {
        console.log(error);
        throw new Error("Could not Disconnect from MongoDb");
    }
}

export { connectionDB, disconnectDB}

