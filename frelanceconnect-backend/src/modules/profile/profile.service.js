import prisma from "../../core/config/db.js";

/**
 * GET MY PROFILE
 */
export const getMyProfile = async (userId) => {
  return prisma.user.findUnique({
    where: { id: userId },

    include: {
      employer: true,

      freelancer: {
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },
    },
  });
};

/**
 * UPDATE FREELANCER PROFILE
 * SAFE + UPSERT + SKILLS SUPPORT
 */
export const updateFreelancerProfile = async (
  userId,
  data = {}
) => {
  // 1. UPSERT freelancer profile
  const freelancer = await prisma.freelancer.upsert({
    where: { userId },

    update: {
      title: data.title || "",
      bio: data.bio || "",
      location: data.location || "",

      hourlyRate: Number(data.hourlyRate || 0),

      experienceYears: Number(
        data.experienceYears || 0
      ),

      education: data.education || "",
      website: data.website || "",
      github: data.github || "",
      linkedin: data.linkedin || "",
    },

    create: {
      userId,

      title: data.title || "",
      bio: data.bio || "",
      location: data.location || "",

      hourlyRate: Number(data.hourlyRate || 0),

      experienceYears: Number(
        data.experienceYears || 0
      ),

      education: data.education || "",
      website: data.website || "",
      github: data.github || "",
      linkedin: data.linkedin || "",
    },
  });

  /**
   * REMOVE OLD SKILLS
   */
  await prisma.freelancerSkill.deleteMany({
    where: {
      freelancerId: freelancer.id,
    },
  });

  /**
   * PARSE SKILLS SAFELY
   */
  let parsedSkills = [];

  try {
    parsedSkills =
      typeof data.skills === "string"
        ? JSON.parse(data.skills)
        : data.skills || [];
  } catch (err) {
    parsedSkills = [];
  }

  /**
   * ADD NEW SKILLS
   */
  if (
    Array.isArray(parsedSkills) &&
    parsedSkills.length > 0
  ) {
    for (const s of parsedSkills) {
      const skillName =
        typeof s === "string"
          ? s.trim()
          : s?.name?.trim();

      if (!skillName) continue;

      /**
       * UPSERT SKILL
       */
      const skill = await prisma.skill.upsert({
        where: {
          name: skillName,
        },

        update: {},

        create: {
          name: skillName,
        },
      });

      /**
       * LINK SKILL TO FREELANCER
       */
      await prisma.freelancerSkill.create({
        data: {
          freelancerId: freelancer.id,
          skillId: skill.id,
        },
      });
    }
  }

  /**
   * RETURN UPDATED USER
   */
  return prisma.user.findUnique({
    where: { id: userId },

    include: {
      employer: true,

      freelancer: {
        include: {
          skills: {
            include: {
              skill: true,
            },
          },
        },
      },
    },
  });
};

/**
 * UPDATE PROFILE IMAGE
 */
export const updateProfileImage = async (
  userId,
  imageUrl
) => {
  return prisma.user.update({
    where: { id: userId },

    data: {
      profileImage: imageUrl,
    },
  });
};

/**
 * UPDATE EMPLOYER PROFILE
 * SAFE UPSERT
 */
export const updateEmployerProfile = async (
  userId,
  data = {}
) => {
  return prisma.employer.upsert({
    where: { userId },

    update: {
      companyName: data.companyName || "",

      companyWebsite:
        data.companyWebsite || "",

      companySize: data.companySize || "",

      industry: data.industry || "",

      location: data.location || "",

      description: data.description || "",
    },

    create: {
      userId,

      companyName: data.companyName || "",

      companyWebsite:
        data.companyWebsite || "",

      companySize: data.companySize || "",

      industry: data.industry || "",

      location: data.location || "",

      description: data.description || "",
    },
  });
};

/**
 * GET PUBLIC FREELANCER PROFILE
 */
export const getPublicFreelancerProfile =
  async (id) => {
    return prisma.freelancer.findUnique({
      where: {
        id: Number(id),
      },

      include: {
        user: true,

        skills: {
          include: {
            skill: true,
          },
        },
      },
    });
  };