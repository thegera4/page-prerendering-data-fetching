import React from 'react'

function UserProfilePage(props) {
  return (
    <h1>{props.userName}</h1>
  )
}

export default UserProfilePage

//getServerSideProps only executes on the server after deployment (not statically generated)
export async function getServerSideProps(context) {
  const { params, req, res } = context
  
  return {
    props: {
      userName: 'Gerardo'
    }
  }
}