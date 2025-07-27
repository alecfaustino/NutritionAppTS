import express, { Request, Response } from "express";

// API Documentation: https://fdc.nal.usda.gov/api-guide
const BASE_URL = "https://api.nal.usda.gov/fdc/v1";

const router = express.Router();

router.get("/search", async (_req: Request, res: Response) => {
  try {
    const query = "potato";
    const params = new URLSearchParams({
      api_key: process.env.USDA_API_KEY || "",
      query,
    });

    const url = `${BASE_URL}/foods/search?${params.toString()}`;

    const response = await fetch(url);
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Error from USDA API" });
    }

    const data = await response.json();

    res.status(200).json({ message: `Search results for ${query}`, data });
  } catch (error) {
    console.error("Error fetching random recipe ", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
