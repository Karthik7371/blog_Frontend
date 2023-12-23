import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'

import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Editor';




const CreatePost = () => {

  const[title,setTitle]=useState('')
  const[content,setContent]=useState('')
  const[summary,setSummary]=useState('');
  const[files,setFiles]=useState('')
  const[redirect,setRedirect]=useState(false)
  

  async function createPost(e){
    const data =new FormData();
    data.set('title',title)
    data.set('content',content)
    data.set('summary',summary)
    data.set('files',files[0])

    
    e.preventDefault()
    //http://localhost:4000/

    const response=await fetch("https://blog-syj3.onrender.com/post",{
      method:'POST',
      body:data,
      credentials:'include'
    })
    const responseData = await response.json();

    if (responseData.error==="No file uploaded") {
     // alert("Please upload  a Photo to Post the Blog.");
      enqueueSnackbar("Please upload  a Photo to Post...",{variant:'error'},{ autoHideDuration: 2000 })
  }




    if(response.ok){
      enqueueSnackbar("Posted Successfully...",{variant:'success'},{ autoHideDuration: 2000 })
      setRedirect(true)
    }
  }
  if(redirect){
    return <Navigate to={'/'} />
  }

  return (
    <div className='w-full '>
        <form onSubmit={createPost}>

            <input type="text" 
            placeholder='Title'
             className='md:my-4 w-full md:p-3 border-b-2 p-2'
             value={title}
             required
             onChange={(e)=>setTitle(e.target.value)}
               />

            <input type={'text'} 
             placeholder='Summary' 
             className='my-4 w-full md:p-3 border-b-2 p-2 '
             value={summary}
             required
             onChange={(e)=>setSummary(e.target.value)}
             />

            <input type={'file'} 
            className='my-6 w-full md:p-3 p-0  '
            onChange={(e)=>setFiles(e.target.files)}
             />
            <Editor value={content}
                onChange={setContent}
                required />

            <button className='bg-slate-600 px-4 py-2 my-5 rounded text-white w-full ease-in duration-300' type='submit'>Post</button>
        </form>
    </div>

  )
}

export default CreatePost
