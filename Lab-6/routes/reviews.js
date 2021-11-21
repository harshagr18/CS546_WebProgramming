const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;

router.get("/:id", async (req, res) => {
  try {
    const reviews = await reviewsData.getAll(req.params.id);
    if (reviews.length == 0) {
      res.status(404).json({ error: "No reviews found" });
      return;
    }
    res.json(reviews);
    return;
  } catch (e) {
    res.status(404).json({ error: "Restaurant not found" });
    return;
  }
});

router.get("/review/:id", async (req, res) => {
  try {
    const review = await reviewsData.get(req.params.id);
    res.json(review);
    return;
  } catch (e) {
    res.status(404).json({ error: e });
  }
});

router.post("/:id", async (req, res) => {
  const newReview = req.body;

  if (
    !newReview.title ||
    !newReview.reviewer ||
    !newReview.rating ||
    !newReview.dateOfReview ||
    !newReview.review
  ) {
    res.status(400).json({ error: "You must Supply All fields" });
    return;
  }

  try {
    const created = await reviewsData.create(
      req.params.id,
      newReview.title,
      newReview.reviewer,
      newReview.rating,
      newReview.dateOfReview,
      newReview.review
    );
    res.status(200).json(created);
    return;
  } catch (e) {
    res.status(404).json({ error: e });
    return;
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "You must Supply and ID to delete" });
    return;
  }
  try {
    await reviewsData.get(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Review not found" });
    return;
  }
  try {
    let deletedReview = await reviewsData.remove(req.params.id);
    res.status(200).json(deletedReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
