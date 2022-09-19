import dbKnex from "../data/db_config.js";
import { returnObject } from "../utils";

export default {
  async index(req, res) {
    // Select all products from db and return
    try {
      const products = await dbKnex
        .select("*")
        .from("products")
        .orderBy("name");
      return res.status(200).json(products);
    } catch (error) {
      return res
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },

  async create(req, res) {
    // Get params from body
    const { name, description, price, image, quantity } = req.body;

    // verify if request has required fields
    if (!name || !price || !quantity)
      return res
        .status(400)
        .json(
          returnObject(
            "Informe todos os campos obrigatórios! name, price e quantity",
            "BAD_INPUT"
          )
        );

    // create new product
    try {
      const createdPoduct = await dbKnex("products").insert({
        name,
        description,
        price,
        image,
        quantity,
      });

      return res
        .status(201)
        .json(
          returnObject(
            "Usuário criado com sucesso!",
            "CREATED_PRODUCT",
            createdPoduct[0]
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
    if (
      field !== "name" ||
      field !== "description" ||
      field !== "id" ||
      field !== "price" ||
      field !== "quantity"
    )
      return req
        .status(400)
        .json(
          returnObject(`Erro: ${field} não é um valor valido`, "BAD_INPUT")
        );

    try {
      const results = await dbKnex("products").whereILike(field, value);

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

    const { name, description, price, image, quantity } = req.body;

    // verify if request has required fields
    if (!id)
      return res
        .status(400)
        .json(returnObject("ID é obrigatorio", "BAD_INPUT"));

    // try create new user
    try {
      await dbKnex("products")
        .where({
          id,
        })
        .update({ name, description, price, image, quantity });

      return res
        .status(201)
        .json(
          returnObject("Produto atualizado com sucesso!", "UPDATED_PRODUCT", id)
        );
    } catch (error) {
      return res
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
      await dbKnex("products").delete({
        id,
      });

      return res
        .status(201)
        .json(
          returnObject("Produto excluido com sucesso!", "DELETED_PRODUCT", id)
        );
    } catch (error) {
      return res
        .status(400)
        .json(returnObject("Erro: " + error.message, "INTERNAL_SERVER_ERROR"));
    }
  },
};
