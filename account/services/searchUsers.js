module.exports = (Account) => async (query) => {
  const users = await Account.find({
    $or: [
      { username: query },
      { firstName: query },
      { lastName: query },
      { email: query },
    ],
  })
    .skip((page - 1) * pageSize)
    .limit(pageSize)
    .lean();

  if (!account) {
    throw new Error("Cannot find any users!");
  }

  return users;
};
