import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URL, {
        dbName:"bhawani_org_aspatal"
    })
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(err => {
        console.error(`Some error occurred while connecting to database: ${err}`);
    });
};
