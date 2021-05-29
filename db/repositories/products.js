const knex = require("../knex");

const insert = async (params) => {
  await knex("products").insert(params);
};

const getByParams = async (params) => {
  const result = await knex("products").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("products").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("products").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
