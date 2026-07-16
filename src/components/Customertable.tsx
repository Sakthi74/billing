import React from 'react'

const Customertable = () => {
    const cus=JSON.parse(localStorage.getItem("customers")||"[]")
  return (
    <div>
     {cus.map((item) => <div key={item.id}><h1>{item.id}</h1>{item.fullName}</div>)}
    </div>
  )
}

export default Customertable
