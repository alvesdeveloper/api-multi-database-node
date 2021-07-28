const ValidClients = [
  { name: 'macapá', database: 'mysql' },
  { name: 'varejão', database: 'postgres' },
];

const getClientByName = (nameClient) => {
  const ValidClient = ValidClients.find(
    (client) => client.name === nameClient.toLowerCase()
  );
  if (ValidClient) {
    const { name } = ValidClient;
    return name;
  } else return ValidClient;
};

const getDatabaseByClient = (nameClient) => {
  const { database } = ValidClients.find(
    (client) => client.name === nameClient.toLowerCase()
  );
  return database;
};

const formatContact = (database, contact) => {
  const result = { name: contact.name, cellphone: contact.cellphone };

  switch (database) {
    case 'mysql':
      return _formatContact(result);
    default:
      return result;
  }
};

const _formatContact = (contact) => {
  contact.name = contact.name.toUpperCase();
  contact.cellphone = _formatPhone(contact.cellphone);
  return { name: contact.name, cellphone: contact.cellphone };
};

const _formatPhone = (phone) => {
  let foneFormatado = '+'
    .concat(phone.substring(0, 2))
    .concat(' (')
    .concat(phone.substring(4, 2))
    .concat(') ')
    .concat(phone.substring(4, 9))
    .concat('-')
    .concat(phone.substring(13, 9));

  return foneFormatado;
};

module.exports = {
  getClientByName,
  getDatabaseByClient,
  formatContact,
};
