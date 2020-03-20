const Product = require("../models/product.model");

module.exports.get_all_products = (req, res) => {
  Product.findAll()
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json({
        message: "Not found",
        error
      });
    });
};
module.exports.get_one_product = (req, res) => {
  Product.findById(req.params.id)
    .then(result => {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).json({
          message: "Not found"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Not found",
        error
      });
    });
};

module.exports.create_product = (req, res) => {
  const body = {
    name: req.body.name,
    price: req.body.price
  };
  Product.add(body)
    .then(result => {
      res.status(200).json({
        message: "Add Successfull",
        result
      });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
};
module.exports.remove_product = (req, res) => {
  Product.remove(req.params.id)
    .then(result => {
      if (result.affectedRows && result.affectedRows > 0) {
        return res.status(200).json({
          message: "Remove success",
          result
        });
      }
      return res.status(404).json({
        message: "Not found"
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Not found",
        error
      });
    });
};
module.exports.update_product = (req, res) => {
  const id = req.params.id;
  const updatOps = {};
  for (const ops of req.body) {
    updatOps[ops.propName] = ops.value;
  }
  Product.update(id, updatOps)
    .then(result => {
      res.status(200).json({
        message: "Update Success",
        result
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
};
