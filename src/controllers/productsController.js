const fs = require('fs');
const path = require('path');

const {getProducts, writeProducts,editProducts} = require("../data/index")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {

		
		res.render("products",{
			getProducts,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProducto = +req.params.id;

        let productoSolicitado = getProducts.find((producto) => producto.id === idProducto);

		
		res.render("detail",{
			producto:productoSolicitado,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {

		res.render("product-create-form")
	},

	// Create -  Method to store
	store: (req, res) => {
		let lastId = 0;

        getProducts.forEach(producto => {
            if(producto.id > lastId){
                lastId = producto.id;
            }
        });

		console.log(req.file.filename)

        let newProduct = {
            ...req.body,
            id:lastId + 1,
            image: req.file ? req.file.filename : "default.jpg",
        }

        getProducts.push(newProduct)

        writeProducts(getProducts)

        res.redirect("/products")
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProducto = +req.params.id;

		let productoSolicitado = getProducts.find((producto) => producto.id === idProducto);

		res.render("product-edit-form",{
			producto:productoSolicitado
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let idProducto = +req.params.id;


        getProducts.forEach(producto => {
            if(producto.id === idProducto){
                producto.name = req.body.name
				producto.price = req.body.price
				producto.discount = req.body.discount
				producto.category = req.body.category
                producto.description = req.body.description
                producto.image = "default.jpg"
            }
        })

        writeProducts(getProducts)

        res.redirect("/products")
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idProducto = +req.params.id;

        getProducts.forEach(producto =>{
            if(producto.id === idProducto){
                let productoEliminado = getProducts.indexOf(producto);

                getProducts.splice(productoEliminado,1)
            }
        })

        writeProducts(getProducts);


        res.redirect("/products")
	}
};

module.exports = controller;