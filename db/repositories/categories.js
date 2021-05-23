const knex = require("../knex");

const insert = async (params) => {
  await knex("categories").insert(params);
};

const getByParams = async (params) => {
  const result = await knex("categories").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("categories").update(params).where({ id });
};

const getAll = async () => await knex("categories").select();

module.exports = {
  insert,
  getByParams,
  getAll,
  update,
};
