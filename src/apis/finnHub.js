import axios from "axios";
const TOKEN="cnl7tq9r01qinikv9ns0cnl7tq9r01qinikv9nsg"
export default axios.create(
    {
        baseURL:"https://finnhub.io/api/v1",
        params:{
            token:TOKEN
        }
    })