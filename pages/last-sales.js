import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

const SALES_URL = 'https://nextjs-client-side-fetching-default-rtdb.firebaseio.com/sales.json'

function LastSalesPage(props) {

  const [sales, setSales] = useState(props.sales)
  //const [isLoading, setIsLoading] = useState(false)

  async function fetchSalesHandler() {
    const response = await fetch(SALES_URL)
    if(!response.ok) {
      throw new Error('Failed to fetch.')
    }
    const data = await response.json()
    const transformedSales = []
    for(const key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        quantity: data[key].quantity
      })
    }
    setSales(transformedSales)
  }

  const { data, error } = useSWR ( SALES_URL, fetchSalesHandler )

  /*useEffect(() => {
    if(data) {
      const transformedSales = []
      for(const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          quantity: data[key].quantity
        })
      }
      setSales(transformedSales)
    }
  },[data])*/

  /*useEffect(() => {
    setIsLoading(true)
    fetch(SALES_URL)
    .then(response => response.json())
    .then(data => {
      const transformedSales = []
      for(const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          quantity: data[key].quantity
        })
      }
      setSales(transformedSales)
      setIsLoading(false)
    }
    )
  },[])*/

  if(error) {
    return <p>Failed to load data.</p>
  }

  if(!data && !sales) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {sales?.map(sale => (
        <li key={sale.id}>{sale.username} - {sale.quantity}</li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const response = await fetch(SALES_URL)
  const data = await response.json()
  const transformedSales = []

  for(const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      quantity: data[key].quantity
    })
  }

  return { props: { sales: transformedSales }, revalidate: 10 }
}

export default LastSalesPage