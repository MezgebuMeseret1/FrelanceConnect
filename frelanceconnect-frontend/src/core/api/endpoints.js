const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
  },

  user: {
    profile: "/user/profile",
  },

  job: {
    list: "/job",
    create: "/job",
  },

  proposal: {
    create: "/proposal",
  },
};

export default endpoints;