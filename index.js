const express = require("express");
const { PrismaClient } = require("@prisma/client");

var session = require("express-session");
var cookieParser = require("cookie-parser");

const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const saltRounds = 10;
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    username: "none",
    userId: "none",
    email: "none",
    profilePicture: "none",
  })
);

async function register(data) {
  await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      profilePicture: data.profilePicture,
      posts: {
        create: {
          title: "Test post",
          content: `This is ${data.name}'s first post`,
          image: "https://i.imgur.com/4oA1W1D.png",
        },
      },
      comments: {
        create: {
          content: "This is a test comment",
          postId: 13,
        },
      },
    },
  });
}

// GET REQUESTS

app.get("/home", async (req, res) => {
  let users = await prisma.user.findMany();
  let posts = await prisma.post.findMany();

  let comments = await prisma.comment.findMany();
  res.json({ users: users, posts: posts, comments: comments });
});

app.get("/login", (req, res) => {
  if (
    session.username === undefined ||
    session.username === null ||
    session.username === ""
  ) {
    return res.json({ isLoggedIn: false });
  } else {
    return res.json({ isLoggedIn: true });
  }
});

// POST REQUESTS

app.post("/post", async (req, res) => {
  let data = res.req.body;
  console.log(data);
  await prisma.post.create({
    data: {
      title: data.header,
      content: data.content,
      image: data.image,
      authorId: session.userId,
      comments: {
        create: {
          content: "This is the content of the comment",
          authorId: session.userId,
        },
      },
    },
  });
});

app.post("/login", async (req, res) => {
  let data = res.req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (user === null) {
    return res.json({ message: "User not found", isLoggedIn: false });
  } else {
    bcrypt.compare(data.password, user.password, function (err, result) {
      if (result === true) {
        console.log(user);
        session.username = user.name;
        session.userId = user.id;
        session.email = user.email;
        session.profilePicture = user.profilePicture;
        return res.json({ message: "Success", user: user, isLoggedIn: true });
      } else {
        return res.json({ message: "Wrong password", isLoggedIn: false });
      }
    });
  }
});

app.post("/register", async (req, res) => {
  let data = res.req.body;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(res.req.body.password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  data.password = hashedPassword;
  data.passwordCheck = hashedPassword;
  data.profilePicture = "https://i.imgur.com/4oA1W1D.png";
  register(data)
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });

  res.json({ message: "Form sent!" });
});

app.post("/createPost", async (req, res) => {
  console.log(res.req.body);
  try {
    await prisma.post.create({
      data: {
        title: res.req.body.header,
        content: res.req.body.content,
        image: res.req.body.image,
        authorId: res.req.body.authorId,
      },
    });
    res.json({ status: "success" });
  } catch (err) {
    console.log(err);
    res.json({ status: "fail" });
  }
});

// app.get("/api", (req, res) => {
//   res.json({ message: "Stupid from server!" });
// });

// app.get("/login", (req, res) => {
//   let usr = {
//     username: session.username,
//     userId: session.userId,
//     email: session.email,
//     profilePicture: session.profilePicture,
//   };
//   res.json({ usr: usr });
// });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
