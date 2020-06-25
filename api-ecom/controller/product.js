const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })

exports.createProduct =
(req, res) =>
 {


  const product = new Product(req.body);

  product.productImagePath = req.file.path;

  product.save((err, category) =>
  {
    if (err)
    {

      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",

        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save category in DBs",
          messgae : err

        });
      }
      }


    res.json({ category });
  });
};


exports.getAllproduct =
   (req, res) =>
  {
    let filter = {
      price: {
          "$lte": 9999999999,
          "$gte": 0
      }
  }
    if (req.query.category) {
      filter.category = req.query.category
  }
  console.log(req.query.min);
  console.log(filter);
  
   let q = Product.find()
   q.populate('category')
   .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(product);
    });
  };



  exports.getAllProducts = (req, res, next) => {

    let filter = {
        price: {
            "$lte": 9999999999,
            "$gte": 0
        }
    }
    if (!isNaN(req.query.max)) {
        filter.price["$lte"] = req.query.max
    }
    if (req.query.category) {
        filter.category = req.query.category
    }
    if (!isNaN(req.query.min)) {
        filter.price["$gte"] = req.query.min
    }

    console.log(req.query.min);
    console.log(filter);

    let q = Product.find(filter)
    q.populate('category')
        // .select('_id name price')
        .exec()
        .then(products => {
            const response = {
                count: products.length,
                products: products.map(product => {
                    return {
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        category: product.category,
                        productImage: product.productImage
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(error => {
            next(error);
        })
};



exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};




exports.getProductByCategory= (req,res,next) => 
{
    const category = req.body.category;
    let productCount = 0;
    product.find().estimatedDacumentCount().exec((err, result) => {
        productCount = result;
    });
    product.find({ category: category }, (err, result) => {
        if (err) {
            res.status(500).json({ status: 'failed', message: err });
        }
        else {
            res.json({ status: 'success', message: 'Product Added', data: result, count: productCount });
        }
    });
}



exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
  };





  exports.updateProduct = (req, res) => {

    const product = req.product;

    product.name = req.body.name;
    product.price = req.body.price;
    product.category = req.body.category;
    product.productImage = req.body.productImage;



    product.save((err, updateProduct) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update product"
        });
      }
      res.json(updateProduct);
    });
  };



exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
};


