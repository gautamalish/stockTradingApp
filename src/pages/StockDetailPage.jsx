import { useParams } from "react-router-dom"
import { useEffect } from "react"
import finnHub from "../apis/finnHub"
export default function StockDetailedPage(){
    useEffect(()=>{
        async function fetchData(){

        }
    })
    const {symbol}=useParams()
    return <div>Stock detailed {symbol}</div>
}