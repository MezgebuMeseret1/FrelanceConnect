const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "100%",
        marginBottom: "10px",
      }}
    />
  );
};

export default Input;