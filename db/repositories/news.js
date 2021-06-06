const knex = require("../knex");

const insert = async (params) => {
  console.log(`adding ${params.name}`)
  console.log(`inserting ... ${params.name}`)
  await knex("news").insert(params);
  const [row] = await knex.select(knex.raw('last_insert_rowid() as id'));
  return row.id
};

const getByParams = async (params) => {
  console.log(`getting ... ${params}`)
  const result = await knex("news").select().where(params);
  return result;
};

const update = async (id, params) => {
  await knex("news").update(params).where({ id });
};

const getAllByOffset = async (offset) =>
  await knex("news").select().limit(500).offset(offset);

module.exports = {
  insert,
  getByParams,
  getAllByOffset,
  update,
};
