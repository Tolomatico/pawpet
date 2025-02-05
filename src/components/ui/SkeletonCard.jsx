function CaretakerCardSkeleton() {
    return (
      <div className="card skeleton-card" style={{ width: "18rem", margin: "15px" }}>
        <div
          className="skeleton skeleton-img"
          style={{
            height: "180px",
            width: "100%",
            borderRadius: "5px",
            background: "#ddd",
          }}
        ></div>
        <div className="card-body">
          <div
            className="skeleton skeleton-summary"
            style={{
              height: "20px",
              width: "50%",
              margin: "15px auto",
              background: "#ddd",
            }}
          ></div>
          <h3
            className="skeleton skeleton-title"
            style={{
              height: "20px",
              width: "60%",
              margin: "15px auto",
              background: "#ddd",
            }}
          ></h3>
          <h5
            className="skeleton skeleton-role"
            style={{
              height: "20px",
              width: "40%",
              margin: "10px auto",
              background: "#ddd",
            }}
          ></h5>
          <p
            className="skeleton skeleton-about"
            style={{
              height: "15px",
              width: "80%",
              margin: "10px auto",
              background: "#ddd",
            }}
          ></p>
          <div
            className="skeleton skeleton-price"
            style={{
              height: "20px",
              width: "30%",
              margin: "20px auto",
              background: "#ddd",
            }}
          ></div>
          <a
            className="skeleton skeleton-button"
            style={{
              display: "block",
              height: "40px",
              width: "80%",
              margin: "20px auto",
              borderRadius: "5px",
              background: "#ddd",
            }}
          ></a>
        </div>
      </div>
    );
  }
  
  export default CaretakerCardSkeleton;