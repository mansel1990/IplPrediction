import dbConn from "../config/db.js";
import util from "util";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import generateToken from "../utils/GenerateToken.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { name, password } = req.body;
    const userArray = await query(
      `SELECT * FROM u932593839_ipl.users u where u.name = "${name}"`
    );
    if (userArray.length > 0 || !name || !password) {
      throw new Error("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    const insertUser = `INSERT INTO u932593839_ipl.users 
          (name, password, is_admin) 
          VALUES('${name}', '${encryptedPassword}', 0);`;
    const result = await query(insertUser);

    res.status(201).json({
      id: result.insertId,
      name: name,
      isAdmin: false,
      token: generateToken(result.insertId),
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const authUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { email, password } = req.body;
    console.log(email);
    const userArray = await query(
      `SELECT * FROM u932593839_ipl.users u where u.name = "${email}"`
    );
    if (userArray.length === 0) {
      throw new Error("Invalid Credentials");
    }

    const user = userArray[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid Credentials");
    }

    res.json({
      id: user.id,
      name: user.name,
      isAdmin: user.is_admin,
      groupId: user.group_id,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

const getUsers = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const users = await query(
      `SELECT id, name FROM u932593839_ipl.users where group_id is null`
    );
    res.json(users);
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const getGroupDetails = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const user = req.user;
    const userArray = await query(
      `SELECT
      u.*,
      g.*
    FROM
      u932593839_ipl.users u,
      u932593839_ipl.groups g
    where
      u.group_id = g.group_id
      and u.name = '${user.name}'`
    );
    const userDetails = userArray[0];

    const groupArr = await query(
      `SELECT
        u.id,
        u.name
      FROM
        u932593839_ipl.users u
      where 
        u.group_id = '${userDetails.group_id}'`
    );
    if (userDetails) {
      res.json({
        userId: user.id,
        userName: user.name,
        groupName: userDetails.group_name,
        groupId: userDetails.group_id,
        budget: userDetails.budget,
        startDate: userDetails.start_date,
        usersInGroup: groupArr,
      });
    } else {
      res.json({
        userId: user.id,
        userName: user.name,
        groupName: null,
        groupId: null,
        budget: null,
      });
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const createGroup = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const { groupName, startDate, seletedUserIds, budget } = req.body;
    const groupArray = await query(
      `SELECT * FROM u932593839_ipl.groups u where u.group_name = "${groupName}"`
    );
    if (groupArray.length > 0) {
      throw new Error("Group already exist");
    }

    if (!groupName || !startDate || !budget) {
      throw new Error("Required values missing");
    }

    const insertUser = `INSERT INTO u932593839_ipl.groups 
          (group_name, start_date, budget) 
          VALUES('${groupName}', '${startDate}', '${budget}');`;
    const result = await query(insertUser);
    const groupId = result.insertId;

    const userUpdate = `UPDATE u932593839_ipl.users
    SET group_id='${groupId}'
    WHERE id in (${seletedUserIds})`;
    const updateResult = await query(userUpdate);

    res.status(201).json({
      id: groupId,
      name: groupName,
      startDate: startDate,
      budget: budget,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getUserProfile = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  try {
    const user = req.user;
    if (user) {
      res.json({
        id: user.user_id,
        name: user.name,
        email: user.email,
        isAdmin: user.is_admin,
        phone: user.phone_number,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

const updateUserProfile = asyncHandler(async (req, res, next) => {
  const query = util.promisify(dbConn.query).bind(dbConn);
  const { id, name, password, email, phone } = req.body;
  let encryptedPassword;
  if (password) {
    const salt = await bcrypt.genSalt(10);
    encryptedPassword = await bcrypt.hash(password, salt);
  }
  try {
    const user = req.user;
    if (user) {
      const updateResult = await query(`UPDATE template.users
        SET name='${name || user.name}', 
        email='${email || user.email}', 
        password='${encryptedPassword || user.password}', 
        phone_number='${phone || user.phone_number}'
        WHERE user_id=${user.user_id}`);
      res.json({
        id: user.user_id,
        name: name || user.name,
        email: email || user.email,
        isAdmin: user.is_admin,
        phoneNumber: phone || user.phone_number,
        token: generateToken(user.user_id),
      });
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(404);
    throw new Error(error);
  }
});

export {
  authUser,
  getUsers,
  registerUser,
  getUserProfile,
  updateUserProfile,
  createGroup,
  getGroupDetails,
};
