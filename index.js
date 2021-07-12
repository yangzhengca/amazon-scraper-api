const express=require('express')
const app=express()
const request=require('request-promise')

const PORT= process.env.PORT || 5000


// const baseUrl=`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

const generateScraperUrl = (apiKey)=>`http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("welcome to my api")
})

//Get product details
app.get('/products/:productId',async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query
    try{
        const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

//Get product reviews
app.get('/products/:productId/reviews',async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query

    try{
        const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-review/${productId}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

//Get product offers
app.get('/products/:productId/offers',async (req,res)=>{
    const {productId}=req.params;
    const {api_key}=req.query

    try{
        const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

//Get search results
app.get('/search/:searchQuery',async (req,res)=>{
    const {searchQuery}=req.params;
    const {api_key}=req.query

    try{
        const response=await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
        res.json(JSON.parse(response))
    }catch(error){
        res.json(error)
    }
})

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))