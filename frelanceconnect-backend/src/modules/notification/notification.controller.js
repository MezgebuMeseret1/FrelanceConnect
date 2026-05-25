import * as service from "./notification.service.js";

export const getNotifications = async (req, res) => {
  const data = await service.getMyNotifications(req.user.id);

  res.json({
    success: true,
    data
  });
};

export const markAsRead = async (req, res) => {
  const data = await service.markAsRead(req.params.id);

  res.json({
    success: true,
    data
  });
};