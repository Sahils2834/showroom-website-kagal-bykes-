import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function ReviewSection() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [error, setError] = useState("");

  // Fetch reviews from Supabase
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      // Fallback to demo reviews if table doesn't exist yet
      setReviews([
        { id: 1, user_name: "Rajesh Kumar", rating: 5, comment: "Excellent service! Got my Splendor+ delivered in perfect condition. The team was very helpful.", created_at: "2026-03-10T10:00:00Z" },
        { id: 2, user_name: "Priya Sharma", rating: 4, comment: "Good experience overall. The finance process was smooth and hassle-free.", created_at: "2026-03-08T10:00:00Z" },
        { id: 3, user_name: "Amit Patel", rating: 5, comment: "Best showroom in Kagal! The staff really knows their bikes. Bought the Xtreme 160R.", created_at: "2026-03-05T10:00:00Z" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    setError("");

    try {
      const { error: dbError } = await supabase.from("reviews").insert([
        {
          user_id: user.id,
          user_name: user.user_metadata?.full_name || user.email.split("@")[0],
          rating: newReview.rating,
          comment: newReview.comment
        }
      ]);

      if (dbError) throw dbError;
      setNewReview({ rating: 5, comment: "" });
      setShowForm(false);
      fetchReviews(); // Refresh
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 30) return `${days} days ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h3 className="text-hero-red uppercase tracking-[0.3em] font-bold text-sm mb-3">
            Testimonials
          </h3>
          <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white">
            What Our Riders Say
          </h2>
        </div>

        {user ? (
          <button
            onClick={() => setShowForm(!showForm)}
            className="mt-4 md:mt-0 bg-hero-red text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition"
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        ) : (
          <Link to="/login" className="mt-4 md:mt-0">
            <button className="border border-hero-red text-hero-red hover:bg-hero-red hover:text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider transition">
              Sign In to Review
            </button>
          </Link>
        )}
      </div>

      {/* Review Form */}
      {showForm && user && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          className="mb-10 bg-white/5 border border-white/10 rounded-xl p-6"
        >
          <h4 className="text-white font-bold mb-4">
            Reviewing as <span className="text-hero-red">{user.user_metadata?.full_name || user.email}</span>
          </h4>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    className={`text-3xl transition ${
                      star <= newReview.rating ? "text-yellow-400" : "text-gray-600"
                    } hover:text-yellow-300`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-wider block mb-2">Your Review</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                required
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-hero-red transition resize-none"
                placeholder="Share your experience..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="bg-hero-red text-white px-6 py-2.5 rounded font-bold text-sm uppercase tracking-wider hover:bg-red-700 transition disabled:opacity-50"
            >
              {submitting ? "Posting..." : "Post Review"}
            </button>
          </form>
        </motion.div>
      )}

      {/* Reviews Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="text-gray-500">Loading reviews...</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-hero-red/30 transition-all duration-300"
            >
              {/* Stars */}
              <div className="text-yellow-400 text-lg mb-3 tracking-wider">
                {renderStars(review.rating)}
              </div>

              {/* Comment */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                "{review.comment}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                <div className="w-9 h-9 rounded-full bg-hero-red/20 flex items-center justify-center text-hero-red font-bold text-sm">
                  {review.user_name?.charAt(0)?.toUpperCase() || "?"}
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{review.user_name}</p>
                  <p className="text-gray-500 text-xs">{timeAgo(review.created_at)}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}