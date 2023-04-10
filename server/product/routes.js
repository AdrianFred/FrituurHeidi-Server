// const express = require("express");
import express from "express";
// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";

export const productRouter = express.Router();

const prisma = new PrismaClient();

// GET all products
productRouter.get("/products", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving products" });
  }
});

// GET single product by ID
productRouter.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving product" });
  }
});

// CREATE a new product
productRouter.post("/products", async (req, res) => {
  const { name, price, description, visible, categoryId } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name, // String
        price, // Float
        description, // String
        visible, // default value is true, wont need to list in body unless false
        categoryId, // Id of category to associate with product, needs id!
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// UPDATE an existing product by ID
productRouter.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description, visible, categoryId } = req.body;
  try {
    const product = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name,
        price,
        description,
        visible,
        categoryId,
      },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating product" });
  }
});

// DELETE an existing product by ID
productRouter.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: { id: parseInt(id) },
    });
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting product" });
  }
});
