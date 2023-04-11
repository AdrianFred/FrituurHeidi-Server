export const getUsers = async (prisma, req, res) => {
  const { name, role, order, page } = req.query;
  let users = [];

  const where = {};

  if (name !== undefined) {
    where.OR = [
      {
        firstName: {
          contains: name,
          mode: "insensitive",
        },
      },
      {
        lastName: {
          contains: name,
          mode: "insensitive",
        },
      },
      {
        number: {
          contains: name,
          mode: "insensitive",
        },
      },
      {
        email: {
          contains: name,
          mode: "insensitive",
        },
      },
    ];
  }

  if (role === "admin" || role === "ADMIN") {
    where.role = "ADMIN";
  }

  const orderBy = {
    createdAt: order === "desc" ? "desc" : "asc",
  };

  const limit = 25;
  let offset = 0;

  if (page !== undefined && !isNaN(parseInt(page))) {
    offset = (parseInt(page) - 1) * limit;
  }

  users = await prisma.user.findMany({
    where,
    orderBy,
    take: limit,
    skip: offset,
  });

  res.json(users);
};
