"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSession } from "@/lib/auth";
import { promptAPI, bookmarkAPI, reviewAPI, reportAPI } from "@/lib/proxy";
import { toast } from "react-toastify";

function Stars({ rating, interactive, onRate }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array(5).fill(0).map((_, i) => (
        <span key={i} onClick={() => interactive && onRate(i + 1)}
          style={{ fontSize: 22, cursor: interactive ? "pointer" : "default", color: i < rating ? "#f59e0b" : "#374151", transition: "color 0.2s" }}>★</span>
      ))}
    </div>
  );
}

function ReportModal({ promptId, onClose }) {
  const reasons = ["Inappropriate Content", "Spam", "Copyright Violation", "Misleading", "Other"];
  const [reason, setReason] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!reason) { toast.error("Select a reason"); return; }
    setLoading(true);
    try {
      await reportAPI.create({ promptId, reason, description: desc });
      toast.success("Report submitted");
      onClose();
    } catch { toast.error("Failed to submit report"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 24 }}>
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 32, width: "100%", maxWidth: 460 }}>
        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#f9fafb", marginBottom: 20 }}>Report Prompt</h3>
        <div style={{ marginBottom: 16 }}>
          {reasons.map(r => (
            <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", cursor: "pointer", color: reason === r ? "#a78bfa" : "#9ca3af" }}>
              <input type="radio" name="reason" value={r} checked={reason === r} onChange={() => setReason(r)} /> {r}
            </label>
          ))}
        </div>
        <textarea className="input-field" placeholder="Additional details (optional)" rows={3}
          value={desc} onChange={e => setDesc(e.target.value)} style={{ marginBottom: 20 }} />
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onClose} className="btn-outline" style={{ flex: 1 }}>Cancel</button>
          <button onClick={submit} className="btn-primary" disabled={loading} style={{ flex: 1 }}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function PromptPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const [prompt, setPrompt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    if (!user) { router.push("/login"); return; }
    promptAPI.getById(id)
      .then(r => {
        setPrompt(r.data?.prompt || r.data);
        setBookmarked(r.data?.isBookmarked || false);
        setReviews(r.data?.reviews || []);
      })
      .catch(() => { toast.error("Failed to load prompt"); router.push("/all-prompts"); })
      .finally(() => setLoading(false));
  }, [id, user]);

  const handleCopy = async () => {
    if (!prompt?.content) return;
    if (prompt.visibility === "private" && !user?.isPremium) { toast.error("Subscribe to Premium to copy this prompt"); return; }
    await navigator.clipboard.writeText(prompt.content);
    await promptAPI.copyPrompt(id);
    setPrompt(p => ({ ...p, copyCount: (p.copyCount || 0) + 1 }));
    toast.success("Prompt copied to clipboard! 📋");
  };

  const handleBookmark = async () => {
    try {
      await bookmarkAPI.toggle(id);
      setBookmarked(b => !b);
      toast.success(bookmarked ? "Bookmark removed" : "Prompt bookmarked! 🔖");
    } catch { toast.error("Failed to update bookmark"); }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    if (!rating) { toast.error("Please give a rating"); return; }
    setSubmittingReview(true);
    try {
      await reviewAPI.create(id, { rating, comment });
      setReviews(r => [{ _id: Date.now(), userName: user.name, userEmail: user.email, rating, comment, createdAt: new Date() }, ...r]);
      setRating(0); setComment("");
      toast.success("Review submitted! ⭐");
    } catch { toast.error("Failed to submit review"); }
    finally { setSubmittingReview(false); }
  };

  if (loading) return (
    <>
      <Navbar />
      <main style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1, position: "relative" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 48, height: 48, border: "3px solid rgba(124,58,237,0.2)", borderTopColor: "#7c3aed", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: "#9ca3af" }}>Loading prompt...</p>
        </div>
      </main>
    </>
  );

  if (!prompt) return null;

  const isPremiumLocked = prompt.visibility === "private" && !user?.isPremium;
  const diffColor = { Beginner: "#10b981", Intermediate: "#f59e0b", Pro: "#ef4444" };

  return (
    <>
      <Navbar />
      {showReport && <ReportModal promptId={id} onClose={() => setShowReport(false)} />}
      <main style={{ padding: "48px 24px", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            {/* Back */}
            <button onClick={() => router.back()} style={{ background: "none", border: "none", color: "#9ca3af", cursor: "pointer", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
              ← Back
            </button>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 32 }} className="prompt-grid">
              {/* Main content */}
              <div>
                {/* Header */}
                <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                    <span className="badge badge-purple">{prompt.category}</span>
                    <span className="badge badge-cyan">{prompt.aiTool}</span>
                    <span style={{ fontSize: 12, padding: "4px 10px", borderRadius: 99, background: `${diffColor[prompt.difficultyLevel]}20`, color: diffColor[prompt.difficultyLevel], border: `1px solid ${diffColor[prompt.difficultyLevel]}30`, fontWeight: 600 }}>
                      {prompt.difficultyLevel}
                    </span>
                    {prompt.visibility === "private" && <span className="badge badge-yellow">👑 Premium</span>}
                  </div>

                  <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, color: "#f9fafb", lineHeight: 1.3, marginBottom: 16 }}>
                    {prompt.title}
                  </h1>

                  <p style={{ color: "#9ca3af", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{prompt.description}</p>

                  {/* Tags */}
                  {prompt.tags?.length > 0 && (
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {prompt.tags.map(t => (
                        <span key={t} style={{ fontSize: 12, color: "#6b7280", background: "rgba(255,255,255,0.04)", padding: "3px 10px", borderRadius: 6 }}>#{t}</span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Prompt content */}
                <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f9fafb" }}>Prompt Content</h2>
                    {!isPremiumLocked && (
                      <button onClick={handleCopy} className="btn-primary" style={{ padding: "8px 20px", fontSize: 13 }}>📋 Copy</button>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <div className={isPremiumLocked ? "blurred-content" : ""} style={{
                      background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 10, padding: 20, fontFamily: "monospace",
                      fontSize: 14, color: "#d1d5db", lineHeight: 1.8, whiteSpace: "pre-wrap",
                      minHeight: 120,
                    }}>
                      {prompt.content || "No content available"}
                    </div>
                    {isPremiumLocked && (
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                        <span style={{ fontSize: 36 }}>🔒</span>
                        <p style={{ color: "#f9fafb", fontWeight: 700, fontSize: 16 }}>Premium Content</p>
                        <p style={{ color: "#9ca3af", fontSize: 13, textAlign: "center" }}>Subscribe to unlock this prompt and all premium content</p>
                        <a href="/payment" className="btn-primary" style={{ textDecoration: "none", padding: "10px 24px" }}>👑 Subscribe to Premium — $5</a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Usage instructions */}
                {prompt.usageInstructions && (
                  <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 28, marginBottom: 24 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f9fafb", marginBottom: 12 }}>Usage Instructions</h2>
                    <p style={{ color: "#9ca3af", fontSize: 14, lineHeight: 1.8 }}>{prompt.usageInstructions}</p>
                  </div>
                )}

                {/* Reviews */}
                <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 28 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 700, color: "#f9fafb", marginBottom: 20 }}>
                    Reviews {reviews.length > 0 && <span style={{ color: "#6b7280", fontSize: 14 }}>({reviews.length})</span>}
                  </h2>

                  {/* Submit review */}
                  {!isPremiumLocked && (
                    <form onSubmit={submitReview} style={{ background: "rgba(124,58,237,0.05)", border: "1px solid rgba(124,58,237,0.15)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                      <div style={{ marginBottom: 12 }}>
                        <label style={{ fontSize: 13, color: "#9ca3af", display: "block", marginBottom: 8 }}>Your Rating</label>
                        <Stars rating={rating} interactive onRate={setRating} />
                      </div>
                      <textarea className="input-field" placeholder="Share your experience with this prompt..." rows={3}
                        value={comment} onChange={e => setComment(e.target.value)} style={{ marginBottom: 12 }} />
                      <button type="submit" className="btn-primary" disabled={submittingReview} style={{ padding: "10px 24px", fontSize: 14 }}>
                        {submittingReview ? "Submitting..." : "Submit Review"}
                      </button>
                    </form>
                  )}

                  {/* Reviews list */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {reviews.length === 0 ? (
                      <p style={{ color: "#6b7280", textAlign: "center", padding: "20px 0" }}>No reviews yet. Be the first!</p>
                    ) : reviews.map(r => (
                      <div key={r._id} style={{ padding: 16, background: "rgba(0,0,0,0.2)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <div>
                            <span style={{ color: "#f9fafb", fontWeight: 600, fontSize: 14 }}>{r.userName || r.name}</span>
                            <span style={{ color: "#6b7280", fontSize: 12, marginLeft: 8 }}>{r.userEmail || r.email}</span>
                          </div>
                          <span style={{ color: "#4b5563", fontSize: 12 }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                        </div>
                        <Stars rating={r.rating} />
                        {r.comment && <p style={{ color: "#9ca3af", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>{r.comment}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Stats */}
                <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f9fafb", marginBottom: 16 }}>Stats</h3>
                  {[
                    { label: "Copy Count", value: prompt.copyCount || 0, icon: "📋" },
                    { label: "Avg Rating", value: prompt.avgRating ? `${prompt.avgRating.toFixed(1)} ★` : "New", icon: "⭐" },
                    { label: "Reviews", value: reviews.length, icon: "💬" },
                  ].map(s => (
                    <div key={s.label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ color: "#6b7280", fontSize: 13 }}>{s.icon} {s.label}</span>
                      <span style={{ color: "#f9fafb", fontWeight: 700, fontSize: 14 }}>{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Creator */}
                <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 24 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#f9fafb", marginBottom: 16 }}>Creator</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src={prompt.creatorPhoto || `https://ui-avatars.com/api/?name=${prompt.creatorName}&background=7c3aed&color=fff`}
                      alt="" style={{ width: 48, height: 48, borderRadius: "50%", border: "2px solid rgba(124,58,237,0.3)" }} />
                    <div>
                      <div style={{ color: "#f9fafb", fontWeight: 700 }}>{prompt.creatorName}</div>
                      <div style={{ color: "#6b7280", fontSize: 12 }}>{prompt.creatorEmail}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ background: "#0d1224", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 10 }}>
                  <button onClick={handleBookmark} style={{
                    padding: "12px", borderRadius: 10, border: `1px solid ${bookmarked ? "rgba(139,92,246,0.5)" : "rgba(124,58,237,0.2)"}`,
                    background: bookmarked ? "rgba(124,58,237,0.15)" : "transparent",
                    color: bookmarked ? "#a78bfa" : "#9ca3af", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s",
                  }}>
                    {bookmarked ? "🔖 Bookmarked" : "🔖 Bookmark"}
                  </button>
                  <button onClick={() => setShowReport(true)} style={{
                    padding: "12px", borderRadius: 10, border: "1px solid rgba(239,68,68,0.2)",
                    background: "transparent", color: "#ef4444", cursor: "pointer", fontWeight: 600, fontSize: 14,
                  }}>🚨 Report</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
      <style>{`
        @media (max-width: 768px) {
          .prompt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}