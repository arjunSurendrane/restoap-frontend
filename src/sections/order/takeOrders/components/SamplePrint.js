/* eslint-disable react/prop-types */
import react, { useEffect, useRef } from 'react'


function SamplePrint ({kitchenId}){
//    const ref = useRef()
   
  //  useEffect(()=>window.print(),[])
  window.print()
  console.log('in sample print page')
   return (<div id={kitchenId}>Hello</div>)
}

export default SamplePrint