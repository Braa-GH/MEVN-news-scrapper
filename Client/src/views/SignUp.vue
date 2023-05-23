<template>
  <form>
    <div class="container">
      <h1>التسجيل</h1>
      <p>يرجى ملء هذا النموذج لإنشاء حساب.</p>
      <hr />
      <!-- name -->
      <input
        style="max-width: 49.3%; min-width: 49%"
        placeholder="الاسم الاول"
        name="fname"
        v-model="firstName"
        required
      />
      <input
        style="max-width: 49.3%; min-width: 49%"
        class="lab2"
        placeholder="الاسم الاخير"
        name="lname"
        v-model="lastName"
        required
      />

      <!-- email -->
      <input
        type="text"
        placeholder=" الايميل"
        name="email"
        id="email"
        v-model="email"
        required
      />

      <!-- password -->
      <input
        style="width: 100%"
        type="password"
        placeholder=" كلمة السر"
        name="psw"
        id="psw"
        required
        v-model="password"
      />
      <input
        style="width: 100%"
        type="password"
        placeholder="تأكيد "
        name="psw-repeat "
        id="psw-repeat "
        v-model="password"
        required
      />

      <button @click="signup({firstName,lastName,email,password})" class="registerbtn">التسجيل</button>
    </div>

    <div class="container signin">
      <p>
        هل لديك حساب؟
        <router-link to="/Login">تسجيل الدخول</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import router from "@/router";

export default {
    name: "SignUp",
    data(){
        return {
            firstName: "Braa",
            lastName: "GH",
            email: "braa@gmail.com",
            password: "12345678**Aa"
        }
    },
    methods: {
        async signup(userData) {
            await axios.post("http://localhost:5000/auth/signup", userData).then(r => {
                router.push('/Login');
            }).then(e => {
                console.log(e)
            })
        }
    }
};
</script>

<style scoped>
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

label {
  color: black;
  font-weight: bolder;
}

/* Add padding to containers */

form {
  max-width: 400px;
  min-width: fit-content;
  margin: auto;
  /* margin-top: 180px; */
  background-color: rgb(129, 126, 121);
  box-shadow: 0 4px 8px 0 rgb(129, 126, 121);
}

input {
  padding: 15px;
  width: 46.5%;
  font-size: 17px;
  font-family: Raleway;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input:focus {
  background-color: #ddd;
  outline: none;
  border: none;
}

.lab2 {
  /* margin-right: 30px; */
}

.container {
  padding: 16px;
  background-color: white;
}

.container h1,
p {
  text-align: center;
  padding: 5px;
}

/* Full-width input fields */

input[type="text"] {
  width: 100%;
  padding: 15px;
  border: none;
  background: #f1f1f1;
}

input[type="password"] {
  padding: 15px;
  width: 46.5%;
  font-size: 17px;
  font-family: Raleway;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type="text"]:focus,
input[type="password"]:focus {
  background-color: #ddd;
  outline: none;
}

/* Overwrite default styles of hr */

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 30px;
}

/* Set a style for the submit button */

.registerbtn {
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

.registerbtn:hover {
  opacity: 1;
}

/* Add a blue text color to links */

a {
  color: dodgerblue;
  text-decoration: none;
}

/* Set a grey background color and center the text of the "sign in" section */

.signin {
  background-color: #f1f1f1;
  text-align: center;
}
</style>
