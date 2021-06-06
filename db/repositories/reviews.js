const knex = require("../knex");

const insert = async (params) => {
  console.log(`adding ${params.name}`)
  await knex("reviews").insert(params);
  const [row] = await knex.select(knex.raw('last_insert_rowid() as id'));
  return row.id
};

const getByParams = async (params) => {
  const result = await knex("reviews").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("reviews").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("reviews").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
