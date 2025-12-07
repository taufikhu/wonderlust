const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");

const MONG_URL = "mongodb://127.0.0.1:27017/WonderLust";

main().then(()=>{
    console.log("connected to DB");
}).catch(err =>{
    console.log(err);
});

async function main() {
      await mongoose.connect(MONG_URL);
  }

  const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) =>({...obj, owner: new mongoose.Types.ObjectId('68fa145ea48117e4422cffea')})); //asigning owner to each listing
    await Listing.insertMany(initData.data);
    console.log("data inserted");
  }
  initDB();