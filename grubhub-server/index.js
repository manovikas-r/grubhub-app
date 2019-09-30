const app = require('./app');

const login = require("./routes/login");
const signup = require("./routes/signup");
const profile = require("./routes/profile");
const restaurant = require("./routes/restaurant");
const images = require("./routes/images");
const uploads = require("./routes/uploads");
const menu = require("./routes/menu");
const cart = require("./routes/cart");

app.use("/grubhub/login", login);
app.use("/grubhub/signup", signup);
app.use("/grubhub/profile", profile);
app.use("/grubhub/restaurant", restaurant);
app.use("/grubhub/images", images);
app.use("/grubhub/uploads", uploads);
app.use("/grubhub/menu", menu);
app.use("/grubhub/cart", cart);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});