export const deleteUser = async (prisma, req, res) => {
  const user = await prisma.user.delete({
    where: {
      uuid: req.params.id,
    },
  });
  res.json(user);
};
