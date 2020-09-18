import React,{useState} from 'react';
import axios from 'axios';


export default function Home(props) {
    
  let [searchitem,setsearchitm] = useState('');
  let  holddata = [],holdtitle =[];
  

  function Addpage(){
      axios.post("/addpage", {
      })
     .then((res) => {
       console.log("Created Successfully",res.data)
     })
    .catch(() => {
      console.log("Oops, request failed!")
    })

  }
 

  function updateholddata(ID,Key,Value) {   
     holddata = (holddata.concat({id: ID,key: Key,val: Value}));
  }
  
  
  function titleupdate(v,t){
     holdtitle =  holdtitle.concat({ID: t,V: v});
  }

function tablehead(title,index) {
  
   return  <th scope='col' key={index}>
     
      <h5> <input type='text'  className='head' onChange={(event) =>  titleupdate(event.target.value,title[1]._id)} defaultValue= {title[1].titlename} /> </h5>
      </th> 
  
  }


function tabledata(current,inde) {
  let val = Object.entries(current);

  return ( 
       <tr>                
           {val.map(function(item,index) {
              if(item[0] !== '_id' && item[0] !== '__v')
               {
              
                     return <td>
                        <h5>  <input type='text' defaultValue={item[1]}  onChange={(event) => updateholddata(val[0][1],item[0],event.target.value)} /></h5>
                           
                          </td>   
               }
           })}
       </tr>
       );
 } 
   function postdata() {
    props.postdata(holddata,holdtitle);
    holdtitle=[];
    holddata=[];
   }


	return (
 <div>
    
      <nav className="navbar ">
            <h1 className='title navbar-brand'>Students Data</h1>

            <div>
               <button onClick={Addpage} className='add'> Add Page...</button>
               <button onClick={postdata} className='save'> Save Data </button>
            </div>

            <div className="form-inline">
                <input className="form-control mr-sm-3" type="search" placeholder="Search" onChange={(event) => setsearchitm(event.target.value)} />
                <button className="btn save" onClick={() => props.finditem(searchitem)}>Search</button>
            </div>
           
           
       </nav>
      
    <table className="table  table-striped  table-bordered">
       <thead >
          <tr>  { props.heads.map(tablehead)}  </tr>
          
       </thead>

       <tbody> 
               { props.datas.map(tabledata)}
       </tbody>
      
    </table>
    
</div>
	);
  }

