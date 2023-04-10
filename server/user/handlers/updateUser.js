export const updateUser = async (prisma, req, res) => {
  const user = await prisma.user.update({
    where: {
      uuid: req.params.id,
    },
    data: {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role,
      updatedAt: new Date(),
    },
  });
  res.json(user);
};
