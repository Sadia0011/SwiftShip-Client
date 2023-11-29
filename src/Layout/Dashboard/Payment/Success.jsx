import React from 'react'
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti'

const Success = () => {
    const navigate=useNavigate()
    const handleHome=()=>{
        navigate("/")
    }
    return (
    <><Confetti
  drawShape={ctx => {
    ctx.beginPath()
    for(let i = 0; i < 22; i++) {
      const angle = 0.35 * i
      const x = (0.2 + (1.5 * angle)) * Math.cos(angle)
      const y = (0.2 + (1.5 * angle)) * Math.sin(angle)
      ctx.lineTo(x, y)
    }
    ctx.stroke()
    ctx.closePath()
  }}
/>
<div className='min-h-screen flex flex-col space-y-6 justify-center items-center'>
    <h2 className="text-4xl font-bold text-blue-700">Payment Successful</h2>
    <button onClick={handleHome} className='btn btn-primary bg-slate-600'>Home</button>
</div>
</>
)
};

export default Success;