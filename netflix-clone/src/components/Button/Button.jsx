function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  loading = false,
  disabled = false,
  icon,
  className = ""
}) {
  const styles = {
    primary: "bg-white text-black hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700",
    dark: "bg-gray-500/70 text-white hover:bg-gray-500"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-3 rounded px-6 py-3 font-bold transition duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
    >
      {icon && icon}
      {loading ? "Loading..." : children}
    </button>
  );
}

export default Button;