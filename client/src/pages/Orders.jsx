import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = async () => {
    const res = await API.get("/orders");
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Refund
  const handleRefund = async (id) => {
    const reason = prompt("Enter refund reason:");
    if (!reason) return;

    await API.put(`/orders/${id}`, {
      status: "Refund Requested",
      reason,
    });

    alert("Refund Requested");
    fetchOrders();
  };

  // Submit Review
  const handleReviewSubmit = async () => {
    if (!selectedOrder) return;

    await API.post("/reviews", {
      orderId: selectedOrder,
      rating,
      comment: review,
    });

    alert("Review Submitted");
    setSelectedOrder(null);
    setRating(0);
    setReview("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>

      {orders.map((o) => (
        <div
          key={o._id}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            margin: "10px 0",
            borderRadius: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <p><b>Total:</b> ₹{o.totalAmount}</p>

          <p>
            <b>Status:</b>{" "}
            <span
              style={{
                color:
                  o.status === "Completed"
                    ? "green"
                    : o.status === "Refund Requested"
                    ? "red"
                    : "orange",
              }}
            >
              {o.status}
            </span>
          </p>

          {/* ⭐ Review Button */}
          {o.status === "Completed" && (
            <button onClick={() => setSelectedOrder(o._id)}>
              Add Review
            </button>
          )}

          {/* 🔁 Refund Button */}
          {o.status === "Completed" && (
            <button
              style={{ marginLeft: "10px", color: "red" }}
              onClick={() => handleRefund(o._id)}
            >
              Request Refund
            </button>
          )}
        </div>
      ))}

      {/* ⭐ Review Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: "30%",
            left: "40%",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
          }}
        >
          <h3>Add Review</h3>

          {/* Stars */}
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{
                  cursor: "pointer",
                  fontSize: "25px",
                  color: star <= rating ? "gold" : "gray",
                }}
              >
                ★
              </span>
            ))}
          </div>

          {/* Review Text */}
          <textarea
            placeholder="Write your review..."
            onChange={(e) => setReview(e.target.value)}
            style={{ width: "100%", marginTop: "10px" }}
          />

          <br /><br />

          <button onClick={handleReviewSubmit}>Submit</button>
          <button onClick={() => setSelectedOrder(null)} style={{ marginLeft: "10px" }}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default Orders;