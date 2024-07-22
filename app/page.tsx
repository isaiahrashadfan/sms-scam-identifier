"use client"
import { FormEvent,useState } from 'react'
 
export default function Page() {
  const [scamResult, setScamResult] = useState("null");
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    console.log(formData)
    const response = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        'message': formData.get('message')
      })
    })
 
    // Handle response if necessary
    const data = await response.json()
    console.log(data)
    setScamResult(data.content)
    // ...
  }
 
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input className='text-black w-[500px] h-[500px]' type="text" name="message" id="message"/>
        <button type="submit">Submit</button>
      </form>

      <p>
        {scamResult}
      </p>
    </div>
  )
}