import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
// const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`
const clientId=`?client_id=${process.env.REACT_APP_ACESS_KEY}`
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`
// remove current scroll code
// set default page to 1
// setup two useEffects
// don't run second on initial render
// check for query value
// if page 1 fetch images
// otherwise setPage(1)
// fix scroll functionality
function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setData]=useState([]);
  const [page,setPage]=useState(1);
  const [query, setquery]=useState('');
  const pageurl=`&page=${page}`;
  const queryurl=`&query=${query}`;
  const mount=useRef(false);
  const [newNum, setNewNum]=useState(false);
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
       
      //console.log(data);
      
      setData((olddata)=>{
        if(query&&page===1){return data.results}
        else if(query){
          return [ ...olddata, ...data.results];
        }else{
          return [...olddata, ...data];
        }
        
      });
      setNewNum(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
      
  }
  function handleClick(e){
    e.preventDefault(); 
    if(!query) return;
    if(page===1){fetchData();}  
    setPage(1);
  }
  useEffect(()=>{
    // eslint-disable-next-line
    fetchData();},[page])
//only when scroll down to the bottom, newNum will be active, then  page update, then fetch data, reduce the fetch number.
    useEffect(()=>{
    if(!mount.current){
        mount.current=true;
        return;        
    }
    if(!newNum) return;
        if(loading) return;
        setPage((oldPage)=>{            
            return(oldPage+1)});
},[newNum]);

    const scrollevent=()=>{
        if(!loading&&(window.innerHeight + window.scrollY > document.body.scrollHeight - 10)){
            setNewNum(true);
            }
      }
    useEffect(()=>{
    window.addEventListener('scroll',scrollevent)
    return ()=>{      
      window.removeEventListener('scroll',scrollevent);
    }
    
  },[])
  return (
    <main>
    <section className="section">
      <div className="search">
        <form className="search-form" action="" method='post'>
          <input type='text' className='form-input ' value={query} onChange={(e)=>{
            setquery(e.target.value);
          }}/>
          <button type='submit' className='submit-btn' placeholder='input' onClick={handleClick}><FaSearch/></button>
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
