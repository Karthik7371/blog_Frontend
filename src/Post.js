import formatISO9075 from "date-fns/formatISO9075"
import {Link} from "react-router-dom"
export default function Post({_id,title,summary,content,files,createdAt,author}){

    return(
        <section id='feed' >
        <div className='flex gap-5 my-10 flex-col md:flex-row  '>
          <div className="md:w-1/2 w-full" >
            <Link to={`/post/${_id}`}>
              <img src={'https://blog-syj3.onrender.com/'+files} alt="img" className="rounded-md" />
            </Link>
           
          </div>
          <div className=" w-full">
          <Link to={`/post/${_id}`}>
              <h3 className='font-bold mb-2 text-xl text-justify'>{title}</h3>
          </Link>
            
            <div className='flex gap-2 mb-3'>
            
            <p >{author.username} </p>
            <time className='text-slate-400'>{formatISO9075(new Date(createdAt))}</time>
            </div>
            
            <p className='text-justify my-5'>{summary}</p>
  
          </div>
  
        </div>
  
        
  
      </section>
    )
}