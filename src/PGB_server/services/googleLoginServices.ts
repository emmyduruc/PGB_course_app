import UsersModel from "../models/userModel";

type Profile = {
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
};

const findOrCreate = async (userProfile: Profile) => {
  //eslint-disable-next-line
  const { email, name, picture, given_name, family_name } = userProfile;
  const user = await UsersModel.findOne({ email: email });
  if (!user) {
    //eslint-disable-next-line
    const newUser = await UsersModel.create({
      email,
      //eslint-disable-next-line
      firstName: given_name,
      //eslint-disable-next-line
      lastName: family_name,
      picture,
    });
    return newUser.save();
  } else {
    return user;
  }
};

const findByEmail = async (email: string) => {
  // const  email  = userEmail
  const TheUserEmail = await UsersModel.find({ email: email });

  return TheUserEmail;
};

export default { findOrCreate, findByEmail };
