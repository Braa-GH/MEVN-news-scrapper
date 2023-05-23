<template>
  <div id="form">
    <h2>تسجيل الدخول</h2>
    <hr />
    <div class="container">
      <label for="email"><b>الايميل</b></label>
      <input type="email" placeholder="ادخل الايميل" name="Email" required v-model="email" />

      <label for="psw"><b>كلمة السر</b></label>
      <input type="password" placeholder="ادخل كلمة السر" name="psw" v-model="password" required />

    </div>

    <div class="container" style="background-color: #f1f1f1">
        <button @click="login({email,password})" class="btn btn-primary d-block mb-1">تسجيل الدخول</button>
      <p>
        <router-link to="/SignUp">إنشاء حساب جديد</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {reactive} from "vue";
import router from "@/router";
import store from "@/store";

export default {
    name: "LogIn",
    data (){
      return {
          email: "braa@gmail.com",
          password: "12345678**Aa"
      }
    },
    methods: {
         login(loginData){
             axios.post("http://localhost:5000/auth/login", loginData).then(response => {
                 localStorage.setItem('token', `Bearer ${response.data}`)
                 router.push('/Home?page=1')
             }).catch(err => {
                 console.log(err)
             })
        }
    }
};
</script>

<style>
/* Global */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  display: flex;
  justify-content: center;
  align-items: center;
}

body {
  font-family: Arial, Helvetica, sans-serif;
  padding: 30px;
}

/* Add padding to containers */

#form {
  max-width: 400px;
  min-width: fit-content;
  margin: auto;
  /* margin-top: 180px; */
  background-color: rgb(129, 126, 121);
  box-shadow: 0 4px 8px 0 rgb(129, 126, 121);
}

form h2 {
  text-align: center;
  padding: 20px;
}

/* Overwrite default styles of hr */

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 30px;
  width: 90%;
  margin: auto;
}

.container {
  padding: 16px;
  background-color: white;
}

/* Full-width input fields */

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="email"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Set a style for the submit button */

.cancelbtn {
  background-color: #1cbff6;
  color: white;
  padding: 16px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
  font-size: 20px;
}

.cancelbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */

a {
  color: dodgerblue;
  text-decoration: none;
}

span,
p {
  font-size: 15px;
  padding: 11px;
  line-height: 2.2;
}

/* Change styles for span and cancel button on extra small screens */

@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
</style>
