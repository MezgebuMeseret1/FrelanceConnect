import * as authService from "./auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    res.status(201).json({
      success: true,
      data: user,
    });

  } catch (err) {
    const status =
      err.message === "Email already exists" ? 409 : 400;

    res.status(status).json({
      success: false,
      message: err.message,
    });
  }
};
export const login = async (req, res) => {
  try {
    const result = await authService.login(req.body);

    res.status(200).json({
  success: true,
  data: result, // must contain { user, token }
});

  } catch (err) {
    const status =
      err.message === "Invalid credentials" ? 401 : 500;

    res.status(status).json({
      success: false,
      message: err.message,
    });
  }
};