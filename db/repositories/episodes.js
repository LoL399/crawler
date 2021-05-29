const knex = require("../knex");

const insert = async (params) => {
  await knex("episodes").insert(params);
};

const getByParams = async (params) => {
  const result = await knex("episodes").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("episodes").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("episodes").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
