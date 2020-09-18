import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Home from './Home';


function App() {
	let [data,setdata] = useState([]), [head,sethead] = useState([]);
	let [button,setbutton] = useState({forward: true, page: 1});


	function Fetchdata()  {
		axios.get('/Home').then(res => {
			// console.log(res.data[1])
		  setdata(res.data[1]);
		  sethead(res.data[0]);
		});
	  }
	

	function forwardpage() {
	
		axios.get('/nextpage').then(res => {
			if( typeof(res.data) !== 'string') {
				setbutton({...button,page: button.page+1});
				 setdata([]);
				 setdata(res.data);					
			}
			else{
				alert("Page doe'nt exist please add one");
			}
		});	
	
	}
   
	function prevpage() {
		
		axios.get('/prevpage').then(res => {
			if( typeof(res.data) !== 'string') {
				setdata([{}]);
				setdata(res.data);
				setbutton({...button,page: button.page-1});
				}
				else{
					alert("Page doe'nt exist");
				}
			
		})
	}

	

function search(searchitem) {
	axios.get("/search",{ 
	  params: {
		   key: searchitem
	  }
	}) .then(function (res) {
		if(res.data == 'nothing found') {
				alert(' Sorry no match found :)');
		}
		else{
			setdata([]);
			setdata([res.data[0]]);		
		 }	
		 		
	})
	.catch(function (error) {
	  
	});
	}

	 
	function postdata(holddata,holdtitle) { 
		axios.post("/Home", {
		   alldata: holddata
		})
	   .then(() => {
		 console.log("Post successful!")
	   })
	  .catch(() => {
		console.log("Oops, request failed!")
	  })
  
	  axios.post("/title", {
		alldata: holdtitle
	 })
	 .then(() => {
	   console.log("Post successful!");
	 })
	.catch(() => {
	   console.log("Oops, request failed!")
  })
 
	}
  
  
	
	  useEffect(() => {  if(button.page == 1) {
		 Fetchdata(); 
		}
	  },[]);
	 
	return( <div>
		   <Home heads = {head}  datas = {data} finditem={search} postdata={postdata} />
             <div className='navibuttons'>
	         {button.page>1  &&  <button className='next' onClick={prevpage}>{button.page-1}</button> }
	         <h1>{button.page}</h1>
	         <button className='next' onClick={forwardpage} >{button.page+1}</button>
			 <h1 style={{display: "block",marginTop: '20px',color: "white"}}>Remember to save data before switching pages.</h1>
			 </div>
		   </div>
		);
}

export default App;
