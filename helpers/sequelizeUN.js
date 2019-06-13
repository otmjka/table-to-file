const config = require('config')
const Sequelize = require('sequelize')

const dbConfig = config.get('db')

const additionalConfig = {
  define: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
}

const sequelizeUN = new Sequelize({...dbConfig, ...additionalConfig})

sequelizeUN.define(
  'sku',
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
    },
    data: {
      allowNull: false,
      type: Sequelize.JSONB,
    },
    data_hash: {
      allowNull: false,
      type: Sequelize.TEXT,
    },
    additional_data: {
      allowNull: false,
      type: Sequelize.JSONB,
    },
    validity_date_from: {
      type: Sequelize.TIME,
    },
    validity_date_to: {
      type: Sequelize.TIME,
    },
    created_by_id: {
      type: Sequelize.UUID,
    },
    created_at: {
      type: Sequelize.TIME,
    },
    updated_at: {
      type: Sequelize.TIME,
    },
    group_type_id: {
      type: Sequelize.INTEGER,
    },
    article: {
      type: Sequelize.BIGINT,
    },
  },
  {}
)

module.exports = {sequelizeUN}
