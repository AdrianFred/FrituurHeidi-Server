export const findUnique = async (prisma, req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      uuid: req.params.id,
    },
  });
  res.json(user);
};
