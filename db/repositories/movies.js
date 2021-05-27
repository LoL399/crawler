const knex = require("../knex");

const insert = async (params) => {
  await knex("movies").insert(params);
};

const getByParams = async (params) => {
  const result = await knex("movies").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("movies").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("movies").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
