const Button = ({ children, onClick, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      style={{
        padding: "10px 16px",
        background: "#2563eb",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
};

export default Button;