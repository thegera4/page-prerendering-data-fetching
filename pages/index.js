import React from 'react'
import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'

function HomePage(props) {
  const { products } = props

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  )
}

//getStaticProps can be used to run code on the server (example hide keys or other code)
export async function getStaticProps(context) { 
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  if(!data) {
    return {
      redirect: { //will redirect to the path specified if no data is returned
        destination: '/no-data'
      }
    }
  }

  if(data.products.length === 0) {
    return { notFound: true } //if true, will return 404 if no data is returned
  }

  return { 
    props: { //should always return a props object
      products: data.products
    },
    revalidate: 10, //how often the page should be regenerated in seconds 
  }
}

export default HomePage