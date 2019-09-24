const app = require('./app');

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const restaurant = require("./routes/restaurant");
const useruploads = require("./routes/useruploads");
const fooduploads = require("./routes/fooduploads");

app.use("/grubhub/login", login);
app.use("/grubhub/signup", signup);
app.use("/grubhub/profile", profile);
app.use("/grubhub/restaurant", restaurant);
app.use("/grubhub/useruploads", useruploads);
app.use("/grubhub/fooduploads", fooduploads);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});