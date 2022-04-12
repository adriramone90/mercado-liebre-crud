const fs = require('fs');
const path = require('path');

const {getProducts} = require("../data/index")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const removeAccents = (str) => {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

const controller = {
	index: (req, res) => {

			let productsInSale = []
			let productsVisited = []

			getProducts.forEach(producto => {
				if(producto.category == "in-sale"){
					productsInSale.push(producto)
				} else {
					productsVisited.push(producto)
				}
			})


		res.render("index",{

			productsInSale,
			productsVisited,
			toThousand

		})
	},


	search: (req, res) => {
		let busqueda = req.query.keywords;

		let searchProduct = busqueda.toLowerCase()

		let resultados = [];

		getProducts.forEach(producto =>{

			let temp = removeAccents(producto.name.toLowerCase())

			if(temp.includes(searchProduct)){
				resultados.push(producto)
			}
		})

		res.render("results",{
			resultados,
			busqueda,
			toThousand
		})
	},
};



module.exports = controller;
