import React from 'react'
import fs from 'fs/promises'
import path from 'path'

function ProductDetailPage(props) {
  const { loadedProduct } = props

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  )
}

export async function getStaticProps(context) {
  const { params } = context
  const productId = params.productId

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  const product = data.products.find(product => product.id === productId)

  return{
    props: {
      loadedProduct: product
    }
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { productId: 'p1' } },
      { params: { productId: 'p2' } },
      { params: { productId: 'p3' } },
    ],
    fallback: false //true, false, or blocking
  }
}

export default ProductDetailPage