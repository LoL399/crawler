const knex = require("../knex");

const insert = async (params) => {
  await knex("tvseries").insert(params);
};

const getByParams = async (params) => {
  const result = await knex("tvseries").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("tvseries").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("tvseries").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
