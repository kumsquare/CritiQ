// config/sequelize.mjs
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('book_review_db', 'root', 'EfasmK*eA3', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;  // Export the sequelize instance

