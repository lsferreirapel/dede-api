import dbKnex from "../data/db_config.js";
import { returnObject } from "../utils.js";

export default {
  async index(req, res) {
    // Select all users from db and return
    try {
      const users = await dbKnex.select("*").from("users").orderBy("name");
      return res.status(200).json(users);
    } catch (error) {
      return res
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },

  async create(req, res) {
    // Get params from body
    const { name, email, password, role, avatar } = req.body;

    // verify if request has required fields
    if (!name || !email || !password)
      return res
        .status(400)
        .json(
          returnObject(
            "Informe todos os campos obrigatórios! Email, Nome e Senhas",
            "BAD_INPUT"
          )
        );

    // create new user
    try {
      const createdUser = await dbKnex("users").insert({
        name,
        email,
        password,
        role,
        avatar,
      });

      return res
        .status(201)
        .json(
          returnObject(
            "Usuário criado com sucesso!",
            "CREATED_USER",
            createdUser[0]
          )
        );
    } catch (error) {
      return res
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },

  async read(req, res) {
    // Get the ID from the URL
    const { field, value } = req.params;

    // verify if field exists
    if (field !== "name" || field !== "email" || field !== "id")
      return req
        .status(400)
        .json(
          returnObject(`Erro: ${field} não é um valor valido`, "BAD_INPUT")
        );

    try {
      const results = await dbKnex("users").whereILike(field, value);

      return res.status(200).json(results);
    } catch (error) {
      return res
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },

  async update(req, res) {
    // get id
    const { id } = req.params;

    const { name, email, role, avatar } = req.body;

    // verify if request has required fields
    if (!id)
      return res
        .status(400)
        .json(returnObject("ID é obrigatorio", "BAD_INPUT"));

    // try create new user
    try {
      await dbKnex("users")
        .where({
          id,
        })
        .update({ name, email, role, avatar });

      res
        .status(201)
        .json(
          returnObject("Usuário atualizado com sucesso!", "UPDAATED_USER", id)
        );
    } catch (error) {
      response
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },

  async delete(req, res) {
    // get id
    const { id } = req.params;

    // verify if request has required fields
    if (!id)
      return res
        .status(400)
        .json(returnObject("ID é obrigatorio", "BAD_INPUT"));
    // try create new user
    try {
      await dbKnex("users").delete({
        id,
      });

      return res
        .status(201)
        .json(
          returnObject("Usuário excluido com sucesso!", "DELETED_USER", id)
        );
    } catch (error) {
      return res
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },
};
