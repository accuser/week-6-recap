const express = require("express");
const { Contact } = require("./models/contact");

const app = express();

app.use(express.json());

app.get("/contacts", async (req, res) => {
  const contacts = await Contact.findAll();

  res.json(contacts);
});

app.get("/contacts/:id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.sendStatus(404);
  }
});

app.post("/contacts", async (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;

  if (firstName && lastName) {
    const contact = await Contact.create({ firstName, lastName, emailAddress });

    if (contact) {
      res.sendStatus(201);
    } else {
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(400);
  }
});

app.get("/contacts/:id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);

  if (contact) {
    res.json(contact);
  } else {
    res.sendStatus(404);
  }
});

app.delete("/contacts/:id", async (req, res) => {
  const contact = await Contact.findByPk(req.params.id);

  if (contact) {
    await contact.destroy();
  }

  res.sendStatus(200);
});

app.put("/contacts/:id", async (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;
  const contact = await Contact.findByPk(req.params.id);

  if (contact) {
    if (firstName && lastName) {
      await contact.update({ firstName, lastName, emailAddress });
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } else {
    res.sendStatus(404);
  }
});

app.patch("/contacts/:id", async (req, res) => {
  const { firstName, lastName, emailAddress } = req.body;
  const contact = await Contact.findByPk(req.params.id);

  if (contact) {
    if (firstName) {
      contact.set("firstName", firstName);
    }

    if (lastName) {
      contact.set("lastName", lastName);
    }

    if (emailAddress) {
      contact.set("emailAddress", emailAddress);
    }

    await contact.save();

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = app;
