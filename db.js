const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres' });
module.exports = sequelize;
const { Sequelize } = require('sequelize');
let = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('Unable to connect:', err));

module.exports = sequelize;
// database.js
document.getElementById('generateQrBtn').addEventListener('click', () => {
  const container = document.getElementById('qrCodeContainer');
  container.innerHTML = '';
  const qrcode = new QRCode(container, {
    text: "https://ethos-partner-profile.com?id=123",
    width: 128,
    height: 128
  });
});
