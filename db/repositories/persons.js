const knex = require("../knex");

const insert = async (params) => {
  await knex("persons").insert(params);
};

const getByParams = async (params) => {
  const result = await knex("persons").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("persons").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("persons").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
