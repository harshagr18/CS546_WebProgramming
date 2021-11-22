const express = require("express");
const router = express.Router();
const data = require("../data");
const usersData = data.users;

let gError = "";

function checkIsProperString(val) {
  if (!val) {
    throw `No input passed`;
  }
  if (typeof val !== "string") {
    throw `Not a string`;
  }
  if (val.indexOf(" ") >= 0) {
    throw `White spaces not allowed`;
  }
}

router.get("/", async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/private");
    } else {
      res.redirect("login");
    }
  } catch (e) {
    res.render("pages/error", { error: e });
    return;
  }
});

router.get("/login", async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/private");
    } else {
      res.render("pages/login");
    }
  } catch (e) {
    res.status(400).render("pages/login", { error: e });
    return;
  }
});

router.get("/signup", async (req, res) => {
  try {
    if (req.session.user) {
      res.redirect("/private");
      return;
    } else {
      res.render("pages/signup", { error: gError });
      gError = "";
      return;
    }
  } catch (e) {
    res.status(400).render("pages/signup", { error: e });
    return;
  }
});

router.get("/private", async (req, res) => {
  if (req.session.user) {
    res.render("pages/private", { username: req.session.user.username });
  } else {
    res.status(403).render("pages/error", { error: "User not logged in" });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("pages/logout");
});

router.post("/login", async (req, res) => {
  try {
    let userInfo = req.body;
    let compare = await usersData.checkUser(
      userInfo.username,
      userInfo.password
    );
    if (compare["authenticated"] === true) {
      req.session.user = { username: userInfo.username };
      res.redirect("/private");
    } else {
      res.render("pages/login", { error: "Incorrect Username / Password" });
    }
  } catch (e) {
    res
      .status(400)
      .render("pages/login", { error: "Incorrect Username / Password" });
  }
});

router.post("/signup", async (req, res) => {
  let userInfo = req.body;

  if (userInfo.username.trim().length < 4) {
    res.status(400).render("pages/signup", {
      error: "Please chose a longer username",
    });
    return;
  }

  if (userInfo.password.trim().length < 6) {
    res.status(400).render("pages/signup", {
      error: "Please chose a longer password without spaces",
    });
    return;
  }

  if (!userInfo) {
    res.status(400).render("pages/signup", {
      error: "You must provide data to create a user",
    });
    return;
  }

  if (!userInfo.username || !userInfo.password) {
    res.status(400).render("pages/signup", {
      error: "Missing data",
    });
    return;
  }

  try {
    const newUser = await usersData.createUser(
      userInfo.username,
      userInfo.password
    );
    res.redirect("/");
  } catch (e) {
    if (e === "Could not add user") {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    } else {
      gError = e;
      res.redirect("/signup");
    }
  }
});

module.exports = router;
