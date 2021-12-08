const isAdmin = () => {
  try {
    return (req, res, next) => {
      if (!req.user.isAdmin) {
        res.status(401);
        throw new Error("Unauthorized");
      }
      next();
    };
  } catch (error) {
    console.log(error);
  }
};

export default isAdmin;
