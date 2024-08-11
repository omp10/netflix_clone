import express from "express";
import { getTrendingMovie,getMovieTrailers,getMovieDetails,getSimilarMovies,getmoviesByCategory } from "../controller/movie.controller.js";

const router=express.Router();

router.get("/trending",getTrendingMovie);
router.get("/:id/trailers",getMovieTrailers);
router.get("/:id/details",getMovieDetails);
router.get("/:id/similar",getSimilarMovies);
router.get("/:category", getmoviesByCategory);





export default router;