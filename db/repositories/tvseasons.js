const knex = require("../knex");

const insert = async (params) => {
  return await knex("tvseasons").insert(params).returning('id');
};

const getByParams = async (params) => {
  const result = await knex("tvseasons").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("tvseasons").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("tvseasons").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
