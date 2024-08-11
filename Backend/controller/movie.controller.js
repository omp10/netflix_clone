import { fetchFromTMDB } from "../services/tmbd.service.js";

export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");

        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trending movies found" });
        }

        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

        res.json({ success: true, content: randomMovie });
    } catch (error) {
        console.error('Error fetching trending movie:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getMovieTrailers(req, res) {
    const { id } = req.params;

    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        
        if (!data.results || data.results.length === 0) {
            return res.status(404).json({ success: false, message: "No trailers found for this movie" });
        }

        res.json({ success: true, trailers: data.results });
    } catch (error) {
        console.error('Error fetching movie trailers:', error);
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getMovieDetails(req,res){
    const {id} = req.params;
    try{
    const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    res.status(200).json({success:true,content:data});

    }catch(error){
        if(error.message.includes("404")){
            return res.status(404).send(null);
        }
        res.status(500).json({success:false,message:"Internal server error"});
        

    }


}

export async function getSimilarMovies(req,res){
    const {id}=req.params;
    try {
       
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,similar:data.results});
        
    } catch (error) {
        res.status(500).json({success:false,message:"Internal server error"});
        
        
    }
}

export async function getmoviesByCategory(req,res){
    const {category}=req.params;
    try{
        const data=await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,content:data.results});
    }catch(error){
        res.status(500).json({success:false,message:"Internal sever error"});
        
    }
}
