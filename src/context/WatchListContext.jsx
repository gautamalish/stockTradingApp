import { createContext,useState } from "react";

export const watchListContext=createContext()

export const WatchListContextProvider=({children})=>{
    const [watchList,setWatchList]=useState(["GOOGL","MSFT","AMZN"])
    function addStock(stock){
        if(watchList.indexOf(stock)===-1){
            setWatchList([...watchList,stock])
        }
    }

    function deleteStock(stock){
        setWatchList( watchList.filter((el)=>{
            return el!==stock
        }))
    }
       

    return <watchListContext.Provider value={{watchList,addStock,deleteStock}}>
        {children}
    </watchListContext.Provider>
}