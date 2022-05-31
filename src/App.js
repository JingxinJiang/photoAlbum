import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientId=`?client_id=0hmpEB61YL5n-pLQQBvEyfRbrg29pG6fEOXfBWuHu-0`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setData]=useState([]);
  const [page,setPage]=useState(1);
  const [query, setquery]=useState('');
  const pageurl=`&page=${page}`;
  const queryurl=`&query=${query}`;
  
  const fetchData=async()=>{
    //let url=`${mainUrl}${clientId}${pageurl}${queryurl}`;
    let url=`${mainUrl}${clientId}${pageurl}`;
    // console.log(query)
    if(query){
      url=`${searchUrl}${clientId}${pageurl}${queryurl}`;
    }else{
      url=`${mainUrl}${clientId}${pageurl}`;
    }
    
    try {
       setLoading(true);
      const res=await fetch(url);
      const data=await res.json();
       const {results}=data;
      //console.log(data);
      console.log(results);
      setData((olddata)=>{
        if(query&&page===1){return data.results}
        else if(query){
          return [ ...olddata, ...data.results];
        }else{
          return [...olddata, ...data];
        }
        
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
      
  }
  function handleClick(e){
    e.preventDefault();    
    setPage(1);
  }
  useEffect(()=>{
    // eslint-disable-next-line
    fetchData();},[page,query])
  useEffect(()=>{
    const event=window.addEventListener('scroll',()=>{
    //  console.log(` window.innerHeight ${window.innerHeight}`)
    //  console.log(` window.scrollY ${window.scrollY}`)
    //  console.log(` DOUCUMENT.height ${document.body.scrollHeight}`)

      if(!loading&&(window.innerHeight + window.scrollY > document.body.scrollHeight - 10)){
        console.log('work');
        
        setPage((oldPage)=>{console.log(oldPage);
          return (oldPage+1);
        })
      }
    })
    return ()=>{
      
      window.removeEventListener('scroll',event);
    }
    // eslint-disable-next-line
  },[])
  return (
    <main>
    <section className="section">
      <div className="search">
        <form className="search-form" action="" method='post'>
          <input type='text' className='form-input '   value={query} onChange={(e)=>{
            setquery(e.target.value);
          }}/>
          <button type='submit' className='submit-btn' onClick={handleClick}><FaSearch/></button>
        </form>        
      </div>
      <div className="photos">
        <div className="photos-center">
          {photos.map((image,index)=>{
            return <Photo key={index} {...image}/>
          })}

        </div>
      </div>
    </section>

  </main>
  )
  
}

export default App
