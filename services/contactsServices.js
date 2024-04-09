import { Contact } from "../contacts/Contact";

export async function listContacts() {
  const contacts = await Contact.find({});

  return contacts;
}

export async function getContactById(id) {
  const contact = await Contact.findById(id);

  return contact;
}

export async function addContact(data) {
  const newContact = await Contact.create(data);

  return newContact;
}

export const updateContactById = async (id, data) => {
  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });

  return updatedContact;
};

export async function removeContact(id) {
  const deletedContact = await Contact.findByIdAndDelete(id);

  return deletedContact;
}

// import fs from "fs/promises";
// import path from "path";
// import { nanoid } from "nanoid";
// const contactsPath = path.resolve("db", "contacts.json");

// export async function listContacts() {
//   const data = await fs.readFile(contactsPath);
//   return JSON.parse(data);
// }

// export async function getContactById(id) {
//   const contactsList = await listContacts();
//   const contact = contactsList.find((item) => item.id === id);
//   return contact || null;
// }

// export async function removeContact(id) {
//   const contactsList = await listContacts();
//   const contactID = contactsList.findIndex((item) => item.id === id);

//   if (contactID === -1) return null;

//   const deletedContact = contactsList.splice(contactID, 1);
//   fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
//   return deletedContact[0];
// }

// export async function addContact(name, email, phone) {
//   const contactsList = await listContacts();
//   const newContact = {
//     id: nanoid(),
//     name,
//     email,
//     phone,
//   };
//   contactsList.push(newContact);

//   fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
//   return newContact;
// }

// export async function updateContactsById(id, data) {
//   const contactsList = await listContacts();
//   const index = contactsList.findIndex((item) => item.id === id);

//   if (index === -1) return null;

//   contactsList[index] = {
//     ...contactsList[index],
//     ...data,
//   };

//   fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
//   return contactsList[index];
// }
