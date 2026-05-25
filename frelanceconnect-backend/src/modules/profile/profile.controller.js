import * as profileService from "./profile.service.js";

export const getMyProfile = async (req, res) => {
  const profile = await profileService.getMyProfile(
    req.user.id
  );

  res.json({
    success: true,
    data: profile,
  });
};
export const updateAvatar = async (req, res) => {
  const { imageUrl } = req.body;

  const user = await profileService.updateProfileImage(
    req.user.id,
    imageUrl
  );

  res.json({
    success: true,
    data: user,
  });
};
export const updateFreelancerProfile = async (
  req,
  res
) => {
  const profile =
    await profileService.updateFreelancerProfile(
      req.user.id,
      req.body
    );

  res.json({
    success: true,
    data: profile,
  });
};

export const updateEmployerProfile = async (
  req,
  res
) => {
  const profile =
    await profileService.updateEmployerProfile(
      req.user.id,
      req.body
    );

  res.json({
    success: true,
    data: profile,
  });
};

export const getPublicFreelancerProfile = async (
  req,
  res
) => {
  const profile =
    await profileService.getPublicFreelancerProfile(
      Number(req.params.id)
    );

  res.json({
    success: true,
    data: profile,
  });
};