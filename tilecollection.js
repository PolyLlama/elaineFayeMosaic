var MosaicTile, test, mongoose, MosaicTileSchema, _;
 
mongoose = require("mongoose");
  
mongoose.connect(process.env.MONGOHQ_URL);
 
MosaicTileSchema = mongoose.Schema({
  tags: Array,
  location: Object,
  filter: String,
  created_time: String,
  link: String,
  likes: {count: Number, data: Array},
  images: {
      low_resolution: {
        url: String,
        width: Number,
        height: Number
      },
      thumbnail: {
        url: String,
        width: Number,
        height: Number
      },
      standard_resolution: {
        url: String,
        width: Number,
        height: Number
      }
  },
  users_in_photo: Array,
  caption: {
    created_time: String,
    text: String
  },
  user: {
    username: String,
    website: String,
    profile_picture: String,
    full_name: String,
    bio: String,
    id: String
  }
});
 
MosaicTile = mongoose.model('MosaicTile', MosaicTileSchema);

exports.add = function(tile, callback){
  tempTile = new MosaicTile(tile);
  tempTile.save(function(err){
    if(err){
      console.log(err)
    }
    else {
      console.log("image saved successfully!")
      if (typeof callback == "function"){
        callback();
      }
    }
  })
}