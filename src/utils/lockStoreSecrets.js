function maskSecret(value) {
  if (!value) return value;
  return String(value).replace(/[A-Za-z0-9]/g, '0');
}

export function lockStoreForGuest(store) {
  if (!store) return store;

  const contacts = (store.store_contacts || []).map((contact) => ({
    ...contact,
    phone: maskSecret(contact.phone),
    telephone: maskSecret(contact.telephone),
    fax: maskSecret(contact.fax),
    email: maskSecret(contact.email),
  }));

  return {
    ...store,
    card_img_locked: true,
    store_contacts: contacts,
    contacts_locked: true,
  };
}
