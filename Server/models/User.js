
const { dbConnection } = require('../configurations');
const { userValidator } = require('../validators');
const {hashSync, compareSync} = require('bcryptjs')

class User{
    constructor(userData) {
        this.userData = userData;
    }

    //valid signup inputs
    static valid(userData){
        return userValidator.signupSchema.validate(userData)
    }

    //valid login inputs
    static validLogin (loginData){
        return userValidator.loginSchema.validate(loginData)
    }

    //login
    static login(loginData){
        return new Promise((resolve, reject) => {
            //validate data
            const validation = User.validLogin(loginData);
            if (validation.error){
                //data does not match our rules
                resolve({
                    status: false,
                    message: validation.error.message,
                    code: 400
                })
            }else{
                dbConnection('users', async (collection) => {
                    //connect to database
                    try {
                        const user = await collection.findOne({
                            //check email
                            email: loginData.email,
                        }, {
                            projection: {firstName:1, lastName: 1, email: 1, password: 1, _id: 1}
                        });

                        if (user){
                            //email is exist... compare hashed password
                            if (compareSync(loginData.password, user.password)) {
                                // passwords are matched
                                resolve({
                                    status: true,
                                    data: user
                                })
                            }else {
                                //incorrect password
                                resolve({
                                    status: false,
                                    code: 401,
                                    message: "Login Failed: Incorrect password"
                                })
                            }
                        }else {
                            //email is not exit
                            resolve({
                                status: false,
                                code: 401,
                                message: "Login Failed: email is not exist!"
                            })
                        }


                    }catch (e) {
                        reject({
                            statue: false,
                            message: e.message
                        })
                    }
                })
            }
        })
    }

    //add user to database
    add(cb){
           dbConnection('users', async (collection) => {
               try { // handle callback errors with callback
                   //encode password
                   this.userData.password = hashSync(this.userData.password);
                   await collection.insertOne(this.userData) //insert user to db
                   cb({
                       //user added successfully
                       status: true
                   })
               }catch (e){
                   //failed to insert user
                   console.log(e.message)
                   cb({
                       status: false,
                       messages: e.message
                   })
               }
           })
    }

    //check existence of user
    isExist(){
        return new Promise( (resolve, reject) => {
            //handling callback with promise
            dbConnection('users', async (collection) => {
                //check for email or full-name
                const user = await collection.findOne({
                    '$or': [ //email || (firstName && LastName)
                        {email: this.userData.email}, //email
                        //full name
                        {
                            '$and':  [
                                {firstName: this.userData.firstName}, //first name
                                {lastName: this.userData.lastName} //last name
                            ]
                        }
                    ]
                });
                if (!user){//user is not exist
                    resolve({
                        existence: false
                    });
                }else{
                    //user is existed in db
                    if (user.email === this.userData.email){ //email is matched
                        resolve({
                            existence: true,
                            message: "email is already exist!"
                        })
                    }else { // Full-name is existed
                        resolve({
                            existence: true,
                            message: "there is a user with the same first and last name!"
                        })
                    }
                }

            })
        })
    }
}
// let data = {
//     firstName: "Braa",
//     lastName: "GH",
//     email: "bra2@gmail.com",
//     password: "123456"
// }
// const user = new User(data);
// user.isExist().then(r => {
//     console.log(r)
// }).catch(e => {
//     console.log(e)
// })



module.exports = User;













