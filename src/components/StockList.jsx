import React,{ useState,useEffect,useContext} from "react"
import finnHub from "../apis/finnHub"
import { watchListContext } from "../context/WatchListContext";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function StockList(){
    const [stock,setStock]=useState([])
    const {watchList}=useContext(watchListContext)
    const navigate=useNavigate()
    useEffect(()=>{
        let isMounted=true
        const fetchData=(async()=>{
            const responses=[]
            try{
                const responses= await Promise.all(watchList.map((item)=>{
                    return finnHub.get("/quote",{
                        params:{
                            symbol:item
                        }
                    })
                }))
                console.log(responses)
                const data=responses.map((response)=>{
                    return {
                    data:response.data,
                    symbol:response.config.params.symbol
                    }
                    
                })
                if(isMounted){
                    setStock(data)
                }
                
            }
            catch(error){
                console.log(error)
            }
            
        })
        fetchData()
        return ()=>(isMounted=false)
    },[watchList])
    function handleStockSelect(symbol){
        navigate(`detail/${symbol}`)
    }
   function changeColor(change){
        return change>0?"success":"danger"
   }
   function renderIcon(change){
    return change>0?<FaCaretUp/>:<FaCaretDown/>
   }
    return <div>
        <table className="table hover mt-5">
            <thead style={{color:"rgb(79,89,102)"}}>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Last</th>
                    <th scope="col">Chg</th>
                    <th scope="col">Chg%</th>
                    <th scope="col">High</th>
                    <th scope="col">Low</th>
                    <th scope="col">Open</th>
                    <th scope="col">Pclose</th>
                </tr>
            </thead>
            <tbody>
                {stock.map(stockData=>{
                    return (
                        <tr style={{cursor:"pointer"}} onClick={()=>handleStockSelect(stockData.symbol)} className="table-row" key={stockData.symbol}>
                            <th scope="row">{stockData.symbol}</th>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.c} {renderIcon(stockData.data.d)}</td>
                            <td className={`text-${changeColor(stockData.data.d)}`}>{stockData.data.d} {renderIcon(stockData.data.d)}</td>
                            <td>{stockData.data.dp}</td>
                            <td>{stockData.data.h}</td>
                            <td>{stockData.data.l}</td>
                            <td>{stockData.data.o}</td>
                            <td>{stockData.data.pc}</td>
                        </tr>
                    )
                })
                
                }
            </tbody>
        </table>
    </div>
}