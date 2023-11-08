import React, { useEffect, useState } from "react";

function Products() {

    const [productsArray, setProductsArray] = useState([])
    const [featuredProduct, setFeaturedProduct] = useState({})

    // console.log(featuredProduct)
    // console.log(featuredProduct.id)
    // console.log(productsArray)
    
    useEffect(() => {
        fetch("/2/sales_overview/products")
        .then(resp=>resp.json())
        .then((data)=>{
            // console.log(data)
            setProductsArray(data)
            setFeaturedProduct(data[0])
        })
    }, [])

    // // useEffect(() => {
    // //     fetch(`/products/1`)
    // //     .then(resp=>resp.json())
    // //     .then((data)=>console.log(data))
    // // }, [])

    const products = []
    productsArray.forEach(product => {
        const is_in_products = products.some((obj) => (obj.id === product.id)) //check if the products variable has an item in it whose id matches the id of this product
        if (!is_in_products) { //if it does not, add the product to the products array
            products.push(product)
        }
        //if it does, skip it
        }
    )
    // // console.log(products)

    const cards = products.map((product) => {
        // console.log(product)
        return (
            <div key={product.id} className="info-box">
                <h2 onClick={() => selectProduct(product)}>{product.name}</h2>
                <p>{product.serial_number}</p>
                <button onClick={editProduct}>Edit(Patch)</button>
                <button onClick={() => deleteProduct(product.id)}>Delete</button>
            </div>
        )
    })

    function selectProduct(product) {
        console.log("product selected")
        setFeaturedProduct(product)
    }

    function editProduct(e) {
        // console.log("edit selected product")
        // console.log(e.target)
    }

    function deleteProduct(id) {
        console.log("fuck runtime errors to death")
        fetch(`/products/${id}`, {
            method: "DELETE"
        })
        // remove product with given id from products
        window.location.reload(false)
    }

    return (
        <>
            <div>
                {cards}
            </div>
            <div className="featured-product">
                <h1>Product</h1>
                <h2>{featuredProduct.name}</h2>
                <h3>Revenue: </h3>
                <h3>Sales: </h3>
            </div>
        </>
    )
}

export default Products 